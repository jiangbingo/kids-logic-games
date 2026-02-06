/**
 * 用户数据管理类
 * 负责用户的创建、切换、删除等操作
 */
class UserStorage {
    constructor() {
        this.storageKey = 'kids_games_users';
        this.currentUserKey = 'kids_games_current_user';
        this.users = this.loadUsers();
    }

    /**
     * 从localStorage加载所有用户
     */
    loadUsers() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('加载用户数据失败:', error);
            return [];
        }
    }

    /**
     * 保存所有用户到localStorage
     */
    saveUsers() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.users));
            return true;
        } catch (error) {
            console.error('保存用户数据失败:', error);
            return false;
        }
    }

    /**
     * 创建新用户
     */
    createUser(username) {
        if (!username || username.trim() === '') {
            throw new Error('用户名不能为空');
        }

        const trimmedUsername = username.trim();
        
        // 检查用户名是否已存在
        if (this.users.some(user => user.username === trimmedUsername)) {
            throw new Error('用户名已存在');
        }

        const user = {
            userId: 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            username: trimmedUsername,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            settings: {
                soundEnabled: true,
                vibrationEnabled: true,
                difficulty: 'normal',
                theme: 'default'
            }
        };

        this.users.push(user);
        this.saveUsers();
        this.setCurrentUser(user.userId);
        
        return user;
    }

    /**
     * 获取所有用户
     */
    getAllUsers() {
        return this.users.map(user => ({
            ...user,
            isCurrent: this.getCurrentUserId() === user.userId
        }));
    }

    /**
     * 获取当前用户ID
     */
    getCurrentUserId() {
        return localStorage.getItem(this.currentUserKey);
    }

    /**
     * 获取当前用户
     */
    getCurrentUser() {
        const currentUserId = this.getCurrentUserId();
        if (!currentUserId) return null;
        
        return this.users.find(user => user.userId === currentUserId) || null;
    }

    /**
     * 设置当前用户
     */
    setCurrentUser(userId) {
        const user = this.users.find(u => u.userId === userId);
        if (user) {
            user.lastLogin = new Date().toISOString();
            this.saveUsers();
            localStorage.setItem(this.currentUserKey, userId);
            return user;
        }
        return null;
    }

    /**
     * 切换用户
     */
    switchUser(userId) {
        return this.setCurrentUser(userId);
    }

    /**
     * 删除用户
     */
    deleteUser(userId) {
        const index = this.users.findIndex(user => user.userId === userId);
        if (index === -1) {
            throw new Error('用户不存在');
        }

        // 如果删除的是当前用户，清除当前用户
        if (this.getCurrentUserId() === userId) {
            localStorage.removeItem(this.currentUserKey);
        }

        // 删除用户及其进度数据
        this.users.splice(index, 1);
        this.saveUsers();

        // 删除该用户的所有进度数据
        const progressStorage = new ProgressStorage();
        progressStorage.deleteAllUserProgress(userId);
        
        return true;
    }

    /**
     * 更新用户设置
     */
    updateUserSettings(userId, settings) {
        const user = this.users.find(u => u.userId === userId);
        if (!user) {
            throw new Error('用户不存在');
        }

        user.settings = { ...user.settings, ...settings };
        this.saveUsers();
        return user;
    }

    /**
     * 清除所有数据（用于测试）
     */
    clearAll() {
        localStorage.removeItem(this.storageKey);
        localStorage.removeItem(this.currentUserKey);
        this.users = [];
    }
}

/**
 * 进度数据管理类
 * 负责游戏进度的保存、加载、查询
 */
class ProgressStorage {
    constructor() {
        this.storageKey = 'kids_games_progress';
        this.progress = this.loadProgress();
    }

    /**
     * 加载所有进度数据
     */
    loadProgress() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : {};
        } catch (error) {
            console.error('加载进度数据失败:', error);
            return {};
        }
    }

    /**
     * 保存进度数据
     */
    saveProgress() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.progress));
            return true;
        } catch (error) {
            console.error('保存进度数据失败:', error);
            return false;
        }
    }

    /**
     * 保存或更新用户进度
     */
    saveUserProgress(userId, gameId, progressData) {
        const userKey = userId || new UserStorage().getCurrentUserId();
        if (!userKey) {
            throw new Error('用户未登录');
        }

        if (!this.progress[userKey]) {
            this.progress[userKey] = {};
        }

        this.progress[userKey][gameId] = {
            ...this.progress[userKey][gameId],
            ...progressData,
            lastPlayed: new Date().toISOString()
        };

        return this.saveProgress();
    }

    /**
     * 获取用户在特定游戏的进度
     */
    getUserProgress(userId, gameId) {
        const userKey = userId || new UserStorage().getCurrentUserId();
        if (!userKey || !this.progress[userKey]) {
            return null;
        }

        return this.progress[userKey][gameId] || null;
    }

    /**
     * 获取用户所有游戏进度
     */
    getAllUserProgress(userId) {
        const userKey = userId || new UserStorage().getCurrentUserId();
        if (!userKey) {
            return null;
        }

        return this.progress[userKey] || {};
    }

    /**
     * 获取用户总体进度统计
     */
    getUserProgressStats(userId) {
        const userProgress = this.getAllUserProgress(userId);
        if (!userProgress) {
            return {
                totalGames: 0,
                completedLevels: 0,
                totalScore: 0,
                lastPlayed: null
            };
        }

        const games = Object.values(userProgress);
        let completedLevels = 0;
        let totalScore = 0;
        let lastPlayed = null;

        games.forEach(game => {
            if (game.completedLevels && Array.isArray(game.completedLevels)) {
                completedLevels += game.completedLevels.length;
            }
            if (game.highScore) {
                totalScore += game.highScore;
            }
            if (game.lastPlayed && (!lastPlayed || new Date(game.lastPlayed) > new Date(lastPlayed))) {
                lastPlayed = game.lastPlayed;
            }
        });

        return {
            totalGames: games.length,
            completedLevels,
            totalScore,
            lastPlayed
        };
    }

    /**
     * 重置用户特定游戏的进度
     */
    resetGameProgress(userId, gameId) {
        const userKey = userId || new UserStorage().getCurrentUserId();
        if (!userKey || !this.progress[userKey]) {
            return false;
        }

        delete this.progress[userKey][gameId];
        return this.saveProgress();
    }

    /**
     * 重置用户所有进度
     */
    resetAllUserProgress(userId) {
        const userKey = userId || new UserStorage().getCurrentUserId();
        if (!userKey) {
            return false;
        }

        this.progress[userKey] = {};
        return this.saveProgress();
    }

    /**
     * 删除用户的所有进度
     */
    deleteAllUserProgress(userId) {
        if (this.progress[userId]) {
            delete this.progress[userId];
            return this.saveProgress();
        }
        return true;
    }

    /**
     * 清除所有进度数据（用于测试）
     */
    clearAll() {
        localStorage.removeItem(this.storageKey);
        this.progress = {};
    }
}

/**
 * 游戏数据管理
 */
class GameManager {
    constructor(storage = null) {
        this.storage = storage || new LocalStorage();
        this.userStorage = this.storage.userStorage || new UserStorage();
        this.progressStorage = this.storage.progressStorage || new ProgressStorage();
    }

    /**
     * 保存游戏进度
     */
    async saveProgress(gameId, progressData) {
        const userId = this.userStorage.getCurrentUserId();
        if (!userId) {
            console.warn('用户未登录，无法保存进度');
            return false;
        }

        return this.storage.saveProgress(userId, gameId, progressData);
    }

    /**
     * 加载游戏进度
     */
    async loadProgress(gameId) {
        const userId = this.userStorage.getCurrentUserId();
        if (!userId) {
            return null;
        }

        return this.storage.getProgress(userId, gameId);
    }

    /**
     * 更新高分
     */
    async updateHighScore(gameId, score) {
        return this.storage.updateHighScore(this.userStorage.getCurrentUserId(), gameId, score);
    }

    /**
     * 记录关卡完成
     */
    async recordLevelComplete(gameId, level) {
        return this.storage.recordLevelComplete(this.userStorage.getCurrentUserId(), gameId, level);
    }

    /**
     * 获取当前关卡
     */
    async getCurrentLevel(gameId) {
        const progress = await this.loadProgress(gameId);
        return progress ? progress.currentLevel : 1;
    }

    /**
       * 获取已完成的关卡列表
       */
    async getCompletedLevels(gameId) {
        const progress = await this.loadProgress(gameId);
        return progress ? progress.completedLevels : [];
    }
}

/**
 * LocalStorage类别名
 * 为了与CloudStorage接口保持一致
 */
class LocalStorage {
    constructor() {
        this.userStorage = new UserStorage();
        this.progressStorage = new ProgressStorage();
    }

    createUser(username, settings) {
        const user = this.userStorage.createUser(username);
        if (settings) {
            this.userStorage.updateUserSettings(user.userId, settings);
        }
        return user;
    }

    getUser(userId) {
        return this.userStorage.getAllUsers().find(u => u.userId === userId) || null;
    }

    saveProgress(userId, gameId, progressData) {
        return this.progressStorage.saveUserProgress(userId, gameId, progressData);
    }

    getProgress(userId, gameId) {
        return this.progressStorage.getUserProgress(userId, gameId);
    }

    updateHighScore(userId, gameId, score) {
        const progress = this.getProgress(userId, gameId) || { highScore: 0 };
        if (score > (progress.highScore || 0)) {
            progress.highScore = score;
            return this.saveProgress(userId, gameId, progress);
        }
        return false;
    }

    recordLevelComplete(userId, gameId, level) {
        const progress = this.getProgress(userId, gameId) || {
            currentLevel: 1,
            completedLevels: [],
            highScore: 0
        };

        if (!progress.completedLevels.includes(level)) {
            progress.completedLevels.push(level);
            progress.currentLevel = Math.max(progress.currentLevel, level + 1);
        }

        return this.saveProgress(userId, gameId, progress);
    }
}

// 导出到全局
window.UserStorage = UserStorage;
window.ProgressStorage = ProgressStorage;
window.GameManager = GameManager;
window.LocalStorage = LocalStorage;