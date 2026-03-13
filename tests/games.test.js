/**
 * 儿童逻辑思维游戏 - 测试套件
 * 创建时间: 2026-03-13
 */

// 模拟游戏管理器
class MockGameManager {
  constructor() {
    this.currentGame = null;
  }
  
  addTouchFeedback(element) {
    element.classList.add('touch-feedback');
    setTimeout(() => element.classList.remove('touch-feedback'), 150);
  }
  
  playSound(type) {
    // 模拟音效
    console.log(`Playing sound: ${type}`);
  }
}

// 测试游戏初始化
describe('Game Initialization', () => {
  let gameManager;
  
  beforeEach(() => {
    gameManager = new MockGameManager();
  });
  
  test('GameManager should be created', () => {
    expect(gameManager).toBeDefined();
    expect(gameManager.currentGame).toBeNull();
  });
});

// 测试用户存储
describe('UserStorage', () => {
  test('should save and load user data', () => {
    const userData = {
      username: 'test_user',
      scores: {},
      settings: {}
    };
    
    localStorage.setItem('userData', JSON.stringify(userData));
    const loaded = JSON.parse(localStorage.getItem('userData'));
    
    expect(loaded.username).toBe('test_user');
  });
});

// 测试分数系统
describe('Score System', () => {
  test('should calculate score correctly', () => {
    const calculateScore = (correct, time, difficulty) => {
      const basePoints = correct ? 100 : 0;
      const timeBonus = Math.max(0, 50 - Math.floor(time / 2));
      const difficultyMultiplier = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 1.5 : 2;
      return Math.floor((basePoints + timeBonus) * difficultyMultiplier);
    };
    
    expect(calculateScore(true, 10, 'easy')).toBe(145);
    expect(calculateScore(true, 10, 'medium')).toBe(217);
    expect(calculateScore(true, 10, 'hard')).toBe(290);
  });
});

// 测试难度调整
describe('Adaptive Difficulty', () => {
  test('should increase difficulty after consecutive wins', () => {
    const adjustDifficulty = (currentLevel, consecutiveWins) => {
      if (consecutiveWins >= 3) {
        return Math.min(currentLevel + 1, 5);
      }
      return currentLevel;
    };
    
    expect(adjustDifficulty(1, 3)).toBe(2);
    expect(adjustDifficulty(5, 3)).toBe(5); // 最高级别
  });
  
  test('should decrease difficulty after consecutive losses', () => {
    const adjustDifficulty = (currentLevel, consecutiveLosses) => {
      if (consecutiveLosses >= 2) {
        return Math.max(currentLevel - 1, 1);
      }
      return currentLevel;
    };
    
    expect(adjustDifficulty(3, 2)).toBe(2);
    expect(adjustDifficulty(1, 2)).toBe(1); // 最低级别
  });
});
