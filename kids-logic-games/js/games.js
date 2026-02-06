class Games {
    constructor() {
        this.score = 0;
        this.currentLevel = 1;
        this.currentGame = null;
        this.gameManager = null;
        this.gameMode = 'campaign'; // 'campaign' 或 'endless'
        
        // 记忆游戏主题（10种）
        this.memoryThemes = [
            { name: '水果', items: ['🍎', '🍏', '🍊', '🍓', '🍋', '🍓', '🍑', '🍍', '🥝'] },
            { name: '蔬菜', items: ['🥕', '🥦', '🍆', '🥒', '🌽', '🥬', '🍅', '🥑', '🧄'] },
            { name: '车辆', items: ['🚗', '🚕', '🚙', '🚌', '🚎', '🚓', '🚒', '🏎️', '🛵'] },
            { name: '动物', items: ['🐶', '🐱', '🐰', '🐼', '🐨', '🦁', '🐯', '🐻', '🦊'] },
            { name: '运动', items: ['⚽', '🏀', '🏈', '⚾', '🎾', '🏉', '🏐', '🏓', '🏸'] },
            { name: '天气', items: ['☀️', '⛅️', '🌤️', '🌧️', '⛈️', '🌈', '❄️', '🌊', '🌙'] },
            { name: '食物', items: ['🍕', '🍔', '🌭', '🍿', '🧂', '🥓', '🍳', '🥪', '🍣'] },
            { name: '花卉', items: ['🌹', '🌻', '🌷', '🌺', '🌼', '🌾', '🌿', '🍀', '🍁', '🍵'] },
            { name: '太空', items: ['🌍', '🌙', '⭐', '🚀', '🛸', '🌌', '🪐', '☄️', '👨🚀'] },
            { name: '音乐', items: ['🎵', '🎶', '🎸', '🎹', '🎺', '🎷', '🎻', '🎤', '📻', '🎼'] }
        ];

        // 关卡配置（50关）
        this.levelConfig = this.generateLevelConfig();
    }

    generateLevelConfig() {
        const levels = [];
        for (let i = 1; i <= 50; i++) {
            let cardCount, displayTime, scoreMultiplier;
            
            if (i <= 10) {
                cardCount = 3;
                displayTime = 6000 - (i * 200);
                scoreMultiplier = 1.0;
            } else if (i <= 25) {
                cardCount = 4;
                displayTime = 5000 - ((i - 10) * 150);
                scoreMultiplier = 1.2;
            } else if (i <= 40) {
                cardCount = 6;
                displayTime = 4000 - ((i - 25) * 100);
                scoreMultiplier = 1.5;
            } else {
                cardCount = 8;
                displayTime = 3000 - ((i - 40) * 50);
                scoreMultiplier = 2.0;
            }

            levels.push({
                level: i,
                cardCount: cardCount,
                displayTime: Math.max(2000, displayTime),
                scoreMultiplier: scoreMultiplier
            });
        }
        return levels;
    }

    addTouchFeedback(element) {
        element.addEventListener('touchstart', () => {
            element.style.transform = 'scale(0.95)';
        }, { passive: true });
        
        element.addEventListener('touchend', () => {
            element.style.transform = 'scale(1)';
        }, { passive: true });
    }

    // ==================== 核心修改：解决无限递归问题 ====================
    // 原来的代码在这里递归调用了自己，导致浏览器崩溃或卡死
    
    startGame(gameType, mode = 'campaign', currentLevel = 1) {
        // 1. 初始化游戏状态
        this.score = 0;
        this.gameMode = mode;
        this.currentLevel = mode === 'endless' ? 1 : currentLevel;
        this.currentGame = gameType;
        
        // 2. 清空游戏区域
        const gameArea = document.getElementById('game-area');
        if (!gameArea) {
            console.error('Game area element not found!');
            return;
        }
        gameArea.innerHTML = '';
        
        // 3. 更新 UI
        const levelDisplay = document.getElementById('level-display');
        if (levelDisplay) {
            levelDisplay.textContent = `关卡: ${this.currentLevel}`;
        }

        const gameNames = {
            'color-match': '🎨 颜色配对',
            'shape-match': '⭐ 形状识别',
            'simple-puzzle': '🧩 简单拼图',
            'number-count': '🔢 数字认知',
            'memory-match': '🧠 记忆大师',
            'letter-match': '🔤 字母配对'
        };

        const titleElement = document.getElementById('game-title');
        if (titleElement) {
            titleElement.textContent = gameNames[gameType] || gameType;
        }
        
        // 4. [关键修复] 根据游戏类型和模式调用具体方法
        switch (gameType) {
            case 'color-match':
                console.log(`🎨 启动颜色配对游戏 (${mode === 'endless' ? '无限模式' : '闯关模式'})`);
                if (mode === 'endless') {
                    this.startColorMatchEndless();
                } else {
                    this.startColorMatchGame();
                }
                break;
            case 'shape-match':
                console.log(`⭐ 启动形状识别游戏 (${mode === 'endless' ? '无限模式' : '闯关模式'})`);
                if (mode === 'endless') {
                    this.startShapeMatchEndless();
                } else {
                    this.startShapeMatchGame();
                }
                break;
            case 'simple-puzzle':
                console.log(`🧩 启动简单拼图游戏 (${mode === 'endless' ? '无限模式' : '闯关模式'})`);
                if (mode === 'endless') {
                    this.startSimplePuzzleEndless();
                } else {
                    this.startSimplePuzzleGame();
                }
                break;
            case 'number-count':
                console.log(`🔢 启动数字认知游戏 (${mode === 'endless' ? '无限模式' : '闯关模式'})`);
                if (mode === 'endless') {
                    this.startNumberCountEndless();
                } else {
                    this.startNumberCountGame();
                }
                break;
            case 'memory-match':
                console.log(`🧠 启动记忆大师游戏 (${mode === 'endless' ? '无限模式' : '闯关模式'})`);
                if (mode === 'endless') {
                    this.startMemoryMatchEndless();
                } else {
                    this.startMemoryMatchGame();
                }
                break;
            case 'letter-match':
                console.log(`🔤 启动字母配对游戏 (${mode === 'endless' ? '无限模式' : '闯关模式'})`);
                if (mode === 'endless') {
                    this.startLetterMatchEndless();
                } else {
                    this.startLetterMatchGame();
                }
                break;
            default:
                console.error(`❌ 未知游戏类型: ${gameType}`);
                gameArea.innerHTML = '<div class="error">❌ 错误：未知游戏类型</div>';
                return;
        }
        
        // 5. 更新分数
        this.updateScore();
        
        console.log('✅ 游戏初始化完成');
    }
    // ==================== 修复结束 ====================

    updateScore() {
        const scoreElement = document.getElementById('score');
        if (scoreElement) {
            scoreElement.textContent = `得分: ${this.score}`;
        }
    }

    showCelebration() {
        const celebration = document.createElement('div');
        celebration.className = 'celebration';
        celebration.textContent = '🎉';
        celebration.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 100px;
            z-index: 9999;
            animation: popIn 0.5s ease;
        `;
        document.body.appendChild(celebration);
        setTimeout(() => celebration.remove(), 1000);
    }

    saveProgress(gameId, progressData) {
        if (this.gameManager) {
            return this.gameManager.saveProgress(gameId, progressData);
        }
        return false;
    }

    loadProgress(gameId) {
        if (this.gameManager) {
            return this.gameManager.loadProgress(gameId);
        }
        return null;
    }

    recordLevelComplete(gameId, level) {
        if (this.gameManager) {
            return this.gameManager.recordLevelComplete(gameId, level);
        }
        return false;
    }

    getCurrentLevel(gameId) {
        const progress = this.loadProgress(gameId);
        return progress ? progress.currentLevel : 1;
    }

    getCompletedLevels(gameId) {
        const progress = this.loadProgress(gameId);
        return progress ? progress.completedLevels : [];
    }

    // ==================== 具体游戏方法 ====================

    startColorMatchGame() {
        document.getElementById('game-title').textContent = '🎨 颜色配对';
        const gameArea = document.getElementById('game-area');
        
        const colors = [
            { name: '红色', color: '#e74c3c', emoji: '🍎' },
            { name: '蓝色', color: '#3498db', emoji: '🫐' },
            { name: '绿色', color: '#2ecc71', emoji: '🍀' },
            { name: '黄色', color: '#f1c40f', emoji: '🌻' },
            { name: '紫色', color: '#9b59b6', emoji: '🍇' }
        ];

        let round = 0;
        const totalRounds = 5;

        const createRound = () => {
            if (round >= totalRounds) {
                gameArea.innerHTML = '<div class="game-instruction">🎉 太棒了！你完成了所有关卡！</div>';
                this.showCelebration();
                this.recordLevelComplete('color-match', round);
                return;
            }

            const targetColor = colors[Math.floor(Math.random() * colors.length)];
            const options = [...colors].sort(() => Math.random() - 0.5).slice(0, 4);
            if (!options.includes(targetColor)) {
                options[Math.floor(Math.random() * options.length)] = targetColor;
            }
            options.sort(() => Math.random() - 0.5);

            gameArea.innerHTML = `
                <div class="game-instruction">找到${targetColor.name}的颜色！</div>
                <div class="target-display" style="background: ${targetColor.color};">
                    ${targetColor.emoji}
                </div>
                <div class="items-grid">
                    ${options.map(opt => `
                        <div class="game-item color-item" data-color="${opt.name}" 
                             style="background: ${opt.color};" data-correct="${opt.name === targetColor.name}">
                            ${opt.emoji}
                        </div>
                    `).join('')}
                </div>
            `;

            const items = gameArea.querySelectorAll('.game-item');
            items.forEach(item => {
                this.addTouchFeedback(item);
                item.addEventListener('click', () => {
                    const isCorrect = item.dataset.correct === 'true';
                    if (isCorrect) {
                        item.classList.add('correct');
                        this.score += 10;
                        this.updateScore();
                        this.showCelebration();
                        this.recordLevelComplete('color-match', round);
                        setTimeout(() => {
                            round++;
                            createRound();
                        }, 1000);
                    } else {
                        item.classList.add('wrong');
                        this.score = Math.max(0, this.score - 5);
                        this.updateScore();
                        setTimeout(() => item.classList.remove('wrong'), 500);
                    }
                });
            });
        };

        createRound();
    }

    startShapeMatchGame() {
        document.getElementById('game-title').textContent = '⭐ 形状识别';
        const gameArea = document.getElementById('game-area');
        
        const shapes = [
            { name: '圆形', emoji: '⭕' },
            { name: '正方形', emoji: '⬜' },
            { name: '三角形', emoji: '🔺' },
            { name: '星形', emoji: '⭐' },
            { name: '爱心', emoji: '❤️' }
        ];

        let round = 0;
        const totalRounds = 5;

        const createRound = () => {
            if (round >= totalRounds) {
                gameArea.innerHTML = '<div class="game-instruction">🎉 太棒了！你完成了所有关卡！</div>';
                this.showCelebration();
                this.recordLevelComplete('shape-match', round);
                return;
            }

            const targetShape = shapes[Math.floor(Math.random() * shapes.length)];
            const options = [...shapes].sort(() => Math.random() - 0.5).slice(0, 4);
            if (!options.includes(targetShape)) {
                options[Math.floor(Math.random() * options.length)] = targetShape;
            }
            options.sort(() => Math.random() - 0.5);

            gameArea.innerHTML = `
                <div class="game-instruction">找到${targetShape.name}！</div>
                <div class="target-display">
                    ${targetShape.emoji}
                </div>
                <div class="items-grid">
                    ${options.map(opt => `
                        <div class="game-item shape-item" data-shape="${opt.name}" 
                             data-correct="${opt.name === targetShape.name}">
                            ${opt.emoji}
                        </div>
                    `).join('')}
                </div>
            `;

            const items = gameArea.querySelectorAll('.game-item');
            items.forEach(item => {
                this.addTouchFeedback(item);
                item.addEventListener('click', () => {
                    const isCorrect = item.dataset.correct === 'true';
                    if (isCorrect) {
                        item.classList.add('correct');
                        this.score += 10;
                        this.updateScore();
                        this.showCelebration();
                        this.recordLevelComplete('shape-match', round);
                        setTimeout(() => {
                            round++;
                            createRound();
                        }, 1000);
                    } else {
                        item.classList.add('wrong');
                        this.score = Math.max(0, this.score - 5);
                        this.updateScore();
                        setTimeout(() => item.classList.remove('wrong'), 500);
                    }
                });
            });
        };

        createRound();
    }

    startSimplePuzzleGame() {
        document.getElementById('game-title').textContent = '🧩 简单拼图';
        const gameArea = document.getElementById('game-area');
        
        const puzzles = [
            { emoji: '🐶', name: '小狗', options: ['🐱', '🐰', '🐼', '🐨', '🐯', '🐻', '🦊'] },
            { emoji: '🐱', name: '小猫', options: ['🐶', '🐰', '🐼', '🐨', '🐯', '🐻', '🦊'] },
            { emoji: '🐰', name: '小兔', options: ['🐶', '🐱', '🐼', '🐨', '🐯', '🐻', '🦊'] },
            { emoji: '🐼', name: '熊猫', options: ['🐶', '🐱', '🐰', '🐨', '🐯', '🐻', '🦊'] }
        ];

        let currentPuzzle = 0;

        const createPuzzle = () => {
            if (currentPuzzle >= puzzles.length) {
                gameArea.innerHTML = '<div class="game-instruction">🎉 太棒了！你完成了所有拼图！</div>';
                this.showCelebration();
                this.recordLevelComplete('simple-puzzle', currentPuzzle);
                return;
            }

            const puzzle = puzzles[currentPuzzle];
            const allOptions = [...puzzle.options].sort(() => Math.random() - 0.5);
            const correctOption = puzzle.emoji;

            gameArea.innerHTML = `
                <div class="game-instruction">找到${puzzle.name}的拼图！</div>
                <div class="target-display">
                    ${puzzle.emoji}
                </div>
                <div class="puzzle-grid">
                    ${allOptions.map(opt => `
                        <div class="puzzle-piece" data-option="${opt}" 
                             data-correct="${opt === correctOption}">
                            ${opt}
                        </div>
                    `).join('')}
                </div>
            `;

            const pieces = gameArea.querySelectorAll('.puzzle-piece');
            pieces.forEach(piece => {
                this.addTouchFeedback(piece);
                piece.addEventListener('click', () => {
                    const isCorrect = piece.dataset.correct === 'true';
                    if (isCorrect) {
                        piece.classList.add('correct');
                        piece.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
                        this.score += 10;
                        this.updateScore();
                        this.showCelebration();
                        
                        setTimeout(() => {
                            currentPuzzle++;
                            createPuzzle();
                        }, 1000);
                    } else {
                        piece.classList.add('wrong');
                        piece.style.background = '#f44336';
                        this.score = Math.max(0, this.score - 5);
                        this.updateScore();
                        setTimeout(() => piece.classList.remove('wrong'), 500);
                    }
                });
            });
        };

        createPuzzle();
    }

    startNumberCountGame() {
        document.getElementById('game-title').textContent = '🔢 数字认知';
        const gameArea = document.getElementById('game-area');
        
        const emojis = ['🍎', '🌟', '🐟', '🌸', '🎈', '🦋', '🦋'];
        let round = 0;
        const totalRounds = 5;

        const createRound = () => {
            if (round >= totalRounds) {
                gameArea.innerHTML = '<div class="game-instruction">🎉 太棒了！你完成了所有关卡！</div>';
                this.showCelebration();
                this.recordLevelComplete('number-count', round);
                return;
            }

            const emoji = emojis[Math.floor(Math.random() * emojis.length)];
            const count = Math.floor(Math.random() * 5) + 1;
            const correctAnswer = count;
            const options = [correctAnswer, correctAnswer - 1, correctAnswer + 1, correctAnswer + 2]
                .filter(n => n >= 1 && n <= 10)
                .sort(() => Math.random() - 0.5)
                .slice(0, 4);

            const emojiString = emoji.repeat(count);

            gameArea.innerHTML = `
                <div class="game-instruction">数一数有多少个？</div>
                <div class="target-display" style="font-size: clamp(30px, 6vw, 50px);">
                    ${emojiString}
                </div>
                <div class="items-grid">
                    ${options.map(num => `
                        <div class="game-item number-item" data-number="${num}">
                            ${num}
                        </div>
                    `).join('')}
                </div>
            `;

            const items = gameArea.querySelectorAll('.game-item');
            items.forEach(item => {
                this.addTouchFeedback(item);
                item.addEventListener('click', () => {
                    const selectedNum = parseInt(item.dataset.number);
                    if (selectedNum === correctAnswer) {
                        item.classList.add('correct');
                        this.score += 10;
                        this.updateScore();
                        this.showCelebration();
                        this.recordLevelComplete('number-count', round);
                        round++;
                        setTimeout(createRound, 1000);
                    } else {
                        item.classList.add('wrong');
                        this.score = Math.max(0, this.score - 5);
                        this.updateScore();
                        setTimeout(() => item.classList.remove('wrong'), 500);
                    }
                });
            });
        };

        createRound();
    }

    startMemoryMatchGame() {
        document.getElementById('game-title').textContent = '🧠 记忆大师';
        const gameArea = document.getElementById('game-area');
        
        const currentLevel = this.getCurrentLevel('memory-match');
        const levelConfig = this.levelConfig[currentLevel - 1] || this.levelConfig[0];
        const themeIndex = (currentLevel - 1) % this.memoryThemes.length;
        const theme = this.memoryThemes[themeIndex];

        let currentRound = 0;
        const roundsPerLevel = Math.min(5, 2 + Math.floor((currentLevel - 1) / 5));

        const createRound = () => {
            if (currentRound >= roundsPerLevel) {
                const nextLevel = currentLevel + 1;
                if (nextLevel > 50) {
                    gameArea.innerHTML = '<div class="game-instruction">🏆 恭喜过关！</div>';
                    this.showCelebration();
                    this.recordLevelComplete('memory-match', this.currentLevel);
                    
                    if (nextLevel > 50) {
                        gameArea.innerHTML = '<div class="game-instruction">🏆 太棒了！你完成了所有50关！</div>';
                        this.showCelebration();
                        return;
                    }
                }
                
                // 下一关
                setTimeout(() => {
                    this.currentLevel = nextLevel;
                    this.startMemoryMatchGame();
                }, 1500);
                return;
            }

            const theme = this.memoryThemes[currentRound % this.memoryThemes.length];
            const difficulty = this.levelConfig[currentLevel - 1] || this.levelConfig[0];

            const shuffledItems = [...theme.items].sort(() => Math.random() - 0.5);
            const selectedItems = shuffledItems.slice(0, difficulty.cardCount);
            const targetItem = selectedItems[Math.floor(Math.random() * selectedItems.length)];
            const points = Math.round(10 * difficulty.scoreMultiplier);

            gameArea.innerHTML = `
                <div class="game-instruction">
                    <div>关卡: ${this.currentLevel}/50</div>
                    <div>主题: ${theme.name}</div>
                    <div>难度: ${difficulty.name}</div>
                    <div>得分: ${points}分</div>
                    <div id="timer-display">准备开始...</div>
                </div>
                <div class="memory-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); gap: 15px; max-width: 500px; width: 100%;"></div>
                <div id="target-display" class="memory-target" style="display: none;">
                    <div class="memory-target-content">
                        <div class="memory-target-instruction">请找到</div>
                        <div class="memory-target-emoji" style="font-size: clamp(60px, 12vw, 100px);">
                            ${targetItem}
                        </div>
                    </div>
                </div>
            `;

            const memoryGrid = gameArea.querySelector('.memory-grid');
            const timerDisplay = document.getElementById('timer-display');
            const targetDisplay = document.getElementById('target-display');

            const cardElements = [];
            selectedItems.forEach((item, index) => {
                const card = document.createElement('div');
                card.className = 'memory-card';
                card.dataset.index = index;
                card.dataset.emoji = item;
                card.dataset.name = item.name;
                card.style.cssText = `
                    width: clamp(80px, 18vw, 120px);
                    height: clamp(80px, 18vw, 120px);
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: 15px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: clamp(40px, 8vw, 60px);
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                    user-select: none;
                    -webkit-tap-highlight-color: transparent;
                    touch-action: manipulation;
                    -webkit-touch-callout: none;
                `;
                card.textContent = item;
                this.addTouchFeedback(card);
                memoryGrid.appendChild(card);
                cardElements.push(card);
            });

            let countdown = 3;
            timerDisplay.textContent = `${countdown} 秒后开始记忆`;

            const countdownInterval = setInterval(() => {
                countdown--;
                if (countdown > 0) {
                    timerDisplay.textContent = `${countdown} 秒后开始记忆`;
                } else {
                    clearInterval(countdownInterval);
                    startMemoryPhase();
                }
            }, 1000);

            const startMemoryPhase = () => {
                timerDisplay.textContent = '记住这些卡片！';
                
                let displayCount = levelConfig.displayTime / 1000;
                const displayInterval = setInterval(() => {
                    displayCount--;
                    if (displayCount > 0) {
                        timerDisplay.textContent = `${displayCount.toFixed(1)} 秒`;
                    } else {
                        clearInterval(displayInterval);
                        hideCards();
                    }
                }, 100);
            };

            const hideCards = () => {
                timerDisplay.textContent = '卡片已隐藏！';
                
                cardElements.forEach(card => {
                    card.style.background = '#e0e0e0';
                    card.textContent = '❓';
                });

                targetDisplay.style.display = 'block';
                targetDisplay.classList.add('active');

                cardElements.forEach(card => {
                    card.addEventListener('click', () => {
                        const isCorrect = card.dataset.emoji === targetItem;

                        if (isCorrect) {
                            card.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
                            card.textContent = targetItem;
                            card.style.transform = 'scale(1.2)';
                            this.score += points;
                            this.updateScore();
                            this.showCelebration();

                            setTimeout(() => {
                                this.recordLevelComplete('memory-match', this.currentLevel);

                                currentRound++;
                                createRound();
                            }, 1500);
                        } else {
                            card.style.background = '#f44336';
                            card.style.transform = 'scale(0.9)';

                            setTimeout(() => {
                                card.style.background = '#e0e0e0';
                                card.textContent = '❓';
                                card.style.transform = 'scale(1)';
                            }, 500);

                            this.score = Math.max(0, this.score - Math.round(5 * levelConfig.scoreMultiplier));
                            this.updateScore();
                        }
                    }, { once: true });
                });
            };
        };

        createRound();
    }

    startLetterMatchGame() {
        document.getElementById('game-title').textContent = '🔤 字母配对';
        const gameArea = document.getElementById('game-area');
        
        const letters = [
            { upper: 'A', lower: 'a' },
            { upper: 'B', lower: 'b' },
            { upper: 'C', lower: 'c' },
            { upper: 'D', lower: 'd' },
            { upper: 'E', lower: 'e' },
            { upper: 'F', lower: 'f' },
            { upper: 'G', lower: 'g' },
            { upper: 'H', lower: 'h' },
            { upper: 'I', lower: 'i' },
            { upper: 'J', lower: 'j' },
            { upper: 'K', lower: 'k' },
            { upper: 'L', lower: 'l' },
            { upper: 'M', lower: 'm' },
            { upper: 'N', lower: 'n' },
            { upper: 'O', lower: 'o' },
            { upper: 'P', lower: 'p' },
            { upper: 'Q', lower: 'q' },
            { upper: 'R', lower: 'r' },
            { upper: 'S', lower: 's' },
            { upper: 'T', lower: 't' },
            { upper: 'U', lower: 'u' },
            { upper: 'V', lower: 'v' },
            { upper: 'W', lower: 'w' },
            { upper: 'X', lower: 'x' },
            { upper: 'Y', lower: 'y' },
            { upper: 'Z', lower: 'z' }
        ];
        
        const currentLevel = this.getCurrentLevel('letter-match');
        let round = 0;
        const roundsPerLevel = Math.min(5, 2 + Math.floor((currentLevel - 1) / 5));
        
        const createRound = () => {
            if (round >= roundsPerLevel) {
                const nextLevel = currentLevel + 1;
                
                gameArea.innerHTML = '<div class="game-instruction">🎉 恭喜过关！</div>';
                this.showCelebration();
                this.recordLevelComplete('letter-match', currentLevel);
                
                setTimeout(() => {
                    const nextLevel = this.currentLevel + 1;
                    this.currentLevel = nextLevel;
                    this.startLetterMatchGame();
                }, 2000);
                return;
            }

            const cardCount = Math.min(4, 2 + Math.floor((currentLevel - 1) / 10));
            const shuffledLetters = [...letters].sort(() => Math.random() - 0.5);
            const selectedLetters = shuffledLetters.slice(0, cardCount);

            gameArea.innerHTML = `
                <div class="game-instruction">
                    <div>关卡: ${this.currentLevel}</div>
                    <div class="instruction-text">找到 ${shuffledLetters[0].upper} 的写</div>
                </div>
                <div class="target-display">
                    <div class="target-emoji">${shuffledLetters[0].upper}</div>
                    <div class="instruction-text">请找到 ${shuffledLetters[0].lower} 的写</div>
                </div>
                <div class="items-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); gap: 15px; max-width: 400px;">
                    ${shuffledLetters.map(letter => `
                        <div class="game-item letter-item" data-letter="${letter.lower}" data-correct="${letter.upper === shuffledLetters[0].upper}">
                            ${letter.lower}
                        </div>
                    `).join('')}
                </div>
            `;

            const items = gameArea.querySelectorAll('.game-item');
            items.forEach(item => {
                this.addTouchFeedback(item);
                item.addEventListener('click', () => {
                    const selectedNum = item.dataset.letter;
                    const isCorrect = item.dataset.correct === 'true';
                    const points = 10;
                    
                    if (isCorrect) {
                        item.classList.add('correct');
                        item.style.animation = 'correctAnswer 0.6s ease';
                        this.score += points;
                        this.updateScore();
                        this.showCelebration();
                        round++;
                        setTimeout(createRound, 1000);
                    } else {
                        item.classList.add('wrong');
                        item.style.animation = 'wrongAnswer 0.5s ease';
                        this.score = Math.max(0, this.score - Math.round(5 * 0.5));
                        this.updateScore();
                        setTimeout(() => {
                            item.classList.remove('wrong');
                        }, 500);
                    }
                });
            });
        };

        createRound();
    }

    // ==================== 无限挑战模式 ====================

    // 颜色配对 - 无限模式
    startColorMatchEndless() {
        document.getElementById('game-title').textContent = '🎨 颜色配对 - 无限';
        const gameArea = document.getElementById('game-area');

        const colors = [
            { name: '红色', color: '#e74c3c', emoji: '🍎' },
            { name: '蓝色', color: '#3498db', emoji: '🫐' },
            { name: '绿色', color: '#2ecc71', emoji: '🍀' },
            { name: '黄色', color: '#f1c40f', emoji: '🌻' },
            { name: '紫色', color: '#9b59b6', emoji: '🍇' }
        ];

        const createRound = () => {
            const targetColor = colors[Math.floor(Math.random() * colors.length)];
            const options = [...colors].sort(() => Math.random() - 0.5).slice(0, 4);
            if (!options.includes(targetColor)) {
                options[Math.floor(Math.random() * options.length)] = targetColor;
            }
            options.sort(() => Math.random() - 0.5);

            // 计算难度倍数（基于分数）
            const difficultyMultiplier = Math.min(2.0, 1 + Math.floor(this.score / 100) * 0.1);
            const points = Math.round(10 * difficultyMultiplier);

            gameArea.innerHTML = `
                <div class="game-instruction">
                    <div>得分: ${this.score}</div>
                    <div>难度倍数: ${difficultyMultiplier.toFixed(1)}x</div>
                </div>
                <div class="target-display" style="background: ${targetColor.color};">
                    ${targetColor.emoji}
                </div>
                <div class="items-grid">
                    ${options.map(opt => `
                        <div class="game-item color-item" data-color="${opt.name}"
                             style="background: ${opt.color};" data-correct="${opt.name === targetColor.name}">
                            ${opt.emoji}
                        </div>
                    `).join('')}
                </div>
            `;

            const items = gameArea.querySelectorAll('.game-item');
            items.forEach(item => {
                this.addTouchFeedback(item);
                item.addEventListener('click', () => {
                    const isCorrect = item.dataset.correct === 'true';
                    if (isCorrect) {
                        item.classList.add('correct');
                        this.score += points;
                        this.updateScore();
                        this.showCelebration();
                        setTimeout(createRound, 1000);
                    } else {
                        item.classList.add('wrong');
                        this.score = Math.max(0, this.score - Math.round(5 * difficultyMultiplier));
                        this.updateScore();
                        setTimeout(() => item.classList.remove('wrong'), 500);
                    }
                });
            });
        };

        createRound();
    }

    // 形状识别 - 无限模式
    startShapeMatchEndless() {
        document.getElementById('game-title').textContent = '⭐ 形状识别 - 无限';
        const gameArea = document.getElementById('game-area');

        const shapes = [
            { name: '圆形', emoji: '⭕' },
            { name: '正方形', emoji: '⬜' },
            { name: '三角形', emoji: '🔺' },
            { name: '星形', emoji: '⭐' },
            { name: '爱心', emoji: '❤️' }
        ];

        const createRound = () => {
            const targetShape = shapes[Math.floor(Math.random() * shapes.length)];
            const options = [...shapes].sort(() => Math.random() - 0.5).slice(0, 4);
            if (!options.includes(targetShape)) {
                options[Math.floor(Math.random() * options.length)] = targetShape;
            }
            options.sort(() => Math.random() - 0.5);

            const difficultyMultiplier = Math.min(2.0, 1 + Math.floor(this.score / 100) * 0.1);
            const points = Math.round(10 * difficultyMultiplier);

            gameArea.innerHTML = `
                <div class="game-instruction">
                    <div>得分: ${this.score}</div>
                    <div>难度倍数: ${difficultyMultiplier.toFixed(1)}x</div>
                </div>
                <div class="target-display">
                    ${targetShape.emoji}
                </div>
                <div class="items-grid">
                    ${options.map(opt => `
                        <div class="game-item shape-item" data-shape="${opt.name}"
                             data-correct="${opt.name === targetShape.name}">
                            ${opt.emoji}
                        </div>
                    `).join('')}
                </div>
            `;

            const items = gameArea.querySelectorAll('.game-item');
            items.forEach(item => {
                this.addTouchFeedback(item);
                item.addEventListener('click', () => {
                    const isCorrect = item.dataset.correct === 'true';
                    if (isCorrect) {
                        item.classList.add('correct');
                        this.score += points;
                        this.updateScore();
                        this.showCelebration();
                        setTimeout(createRound, 1000);
                    } else {
                        item.classList.add('wrong');
                        this.score = Math.max(0, this.score - Math.round(5 * difficultyMultiplier));
                        this.updateScore();
                        setTimeout(() => item.classList.remove('wrong'), 500);
                    }
                });
            });
        };

        createRound();
    }

    // 简单拼图 - 无限模式
    startSimplePuzzleEndless() {
        document.getElementById('game-title').textContent = '🧩 简单拼图 - 无限';
        const gameArea = document.getElementById('game-area');

        const puzzles = [
            { emoji: '🐶', name: '小狗', options: ['🐱', '🐰', '🐼', '🐨', '🐯', '🐻', '🦊'] },
            { emoji: '🐱', name: '小猫', options: ['🐶', '🐰', '🐼', '🐨', '🐯', '🐻', '🦊'] },
            { emoji: '🐰', name: '小兔', options: ['🐶', '🐱', '🐼', '🐨', '🐯', '🐻', '🦊'] },
            { emoji: '🐼', name: '熊猫', options: ['🐶', '🐱', '🐰', '🐨', '🐯', '🐻', '🦊'] }
        ];

        const createPuzzle = () => {
            const puzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
            const allOptions = [...puzzle.options].sort(() => Math.random() - 0.5);
            const correctOption = puzzle.emoji;

            const difficultyMultiplier = Math.min(2.0, 1 + Math.floor(this.score / 100) * 0.1);
            const points = Math.round(10 * difficultyMultiplier);

            gameArea.innerHTML = `
                <div class="game-instruction">
                    <div>得分: ${this.score}</div>
                    <div>难度倍数: ${difficultyMultiplier.toFixed(1)}x</div>
                </div>
                <div class="target-display">
                    ${puzzle.emoji}
                </div>
                <div class="puzzle-grid">
                    ${allOptions.map(opt => `
                        <div class="puzzle-piece" data-option="${opt}"
                             data-correct="${opt === correctOption}">
                            ${opt}
                        </div>
                    `).join('')}
                </div>
            `;

            const pieces = gameArea.querySelectorAll('.puzzle-piece');
            pieces.forEach(piece => {
                this.addTouchFeedback(piece);
                piece.addEventListener('click', () => {
                    const isCorrect = piece.dataset.correct === 'true';
                    if (isCorrect) {
                        piece.classList.add('correct');
                        piece.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
                        this.score += points;
                        this.updateScore();
                        this.showCelebration();
                        setTimeout(createPuzzle, 1000);
                    } else {
                        piece.classList.add('wrong');
                        piece.style.background = '#f44336';
                        this.score = Math.max(0, this.score - Math.round(5 * difficultyMultiplier));
                        this.updateScore();
                        setTimeout(() => piece.classList.remove('wrong'), 500);
                    }
                });
            });
        };

        createPuzzle();
    }

    // 数字认知 - 无限模式
    startNumberCountEndless() {
        document.getElementById('game-title').textContent = '🔢 数字认知 - 无限';
        const gameArea = document.getElementById('game-area');

        const emojis = ['🍎', '🌟', '🐟', '🌸', '🎈', '🦋'];

        const createRound = () => {
            const emoji = emojis[Math.floor(Math.random() * emojis.length)];
            const count = Math.floor(Math.random() * 5) + 1;
            const correctAnswer = count;
            const options = [correctAnswer, correctAnswer - 1, correctAnswer + 1, correctAnswer + 2]
                .filter(n => n >= 1 && n <= 10)
                .sort(() => Math.random() - 0.5)
                .slice(0, 4);

            const emojiString = emoji.repeat(count);

            const difficultyMultiplier = Math.min(2.0, 1 + Math.floor(this.score / 100) * 0.1);
            const points = Math.round(10 * difficultyMultiplier);

            gameArea.innerHTML = `
                <div class="game-instruction">
                    <div>得分: ${this.score}</div>
                    <div>难度倍数: ${difficultyMultiplier.toFixed(1)}x</div>
                </div>
                <div class="target-display" style="font-size: clamp(30px, 6vw, 50px);">
                    ${emojiString}
                </div>
                <div class="items-grid">
                    ${options.map(num => `
                        <div class="game-item number-item" data-number="${num}">
                            ${num}
                        </div>
                    `).join('')}
                </div>
            `;

            const items = gameArea.querySelectorAll('.game-item');
            items.forEach(item => {
                this.addTouchFeedback(item);
                item.addEventListener('click', () => {
                    const selectedNum = parseInt(item.dataset.number);
                    if (selectedNum === correctAnswer) {
                        item.classList.add('correct');
                        this.score += points;
                        this.updateScore();
                        this.showCelebration();
                        setTimeout(createRound, 1000);
                    } else {
                        item.classList.add('wrong');
                        this.score = Math.max(0, this.score - Math.round(5 * difficultyMultiplier));
                        this.updateScore();
                        setTimeout(() => item.classList.remove('wrong'), 500);
                    }
                });
            });
        };

        createRound();
    }

    // 记忆大师 - 无限模式
    startMemoryMatchEndless() {
        document.getElementById('game-title').textContent = '🧠 记忆大师 - 无限';
        const gameArea = document.getElementById('game-area');

        let endlessLevel = 1;
        const maxDisplayTime = 6000;
        const minDisplayTime = 2000;

        const createRound = () => {
            const difficulty = Math.min(3, Math.floor(endlessLevel / 5));
            const cardCount = Math.min(8, 3 + difficulty);
            const displayTime = Math.max(minDisplayTime, maxDisplayTime - (endlessLevel * 100));
            const themeIndex = endlessLevel % this.memoryThemes.length;
            const theme = this.memoryThemes[themeIndex];

            const shuffledItems = [...theme.items].sort(() => Math.random() - 0.5);
            const selectedItems = shuffledItems.slice(0, cardCount);
            const targetItem = selectedItems[Math.floor(Math.random() * selectedItems.length)];

            const difficultyMultiplier = Math.min(2.0, 1 + Math.floor(endlessLevel / 10) * 0.1);
            const points = Math.round(10 * difficultyMultiplier * (1 + difficulty * 0.2));

            gameArea.innerHTML = `
                <div class="game-instruction">
                    <div>得分: ${this.score}</div>
                    <div>轮次: ${endlessLevel}</div>
                    <div>主题: ${theme.name}</div>
                    <div>得分: ${points}分</div>
                    <div id="timer-display">准备开始...</div>
                </div>
                <div class="memory-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); gap: 15px; max-width: 500px; width: 100%;"></div>
                <div id="target-display" class="memory-target" style="display: none;">
                    <div class="memory-target-content">
                        <div class="memory-target-instruction">请找到</div>
                        <div class="memory-target-emoji" style="font-size: clamp(60px, 12vw, 100px);">
                            ${targetItem}
                        </div>
                    </div>
                </div>
            `;

            const memoryGrid = gameArea.querySelector('.memory-grid');
            const timerDisplay = document.getElementById('timer-display');
            const targetDisplay = document.getElementById('target-display');

            const cardElements = [];
            selectedItems.forEach((item, index) => {
                const card = document.createElement('div');
                card.className = 'memory-card';
                card.dataset.index = index;
                card.dataset.emoji = item;
                card.style.cssText = `
                    width: clamp(80px, 18vw, 120px);
                    height: clamp(80px, 18vw, 120px);
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: 15px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: clamp(40px, 8vw, 60px);
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                    user-select: none;
                `;
                card.textContent = item;
                this.addTouchFeedback(card);
                memoryGrid.appendChild(card);
                cardElements.push(card);
            });

            let countdown = 3;
            timerDisplay.textContent = `${countdown} 秒后开始记忆`;

            const countdownInterval = setInterval(() => {
                countdown--;
                if (countdown > 0) {
                    timerDisplay.textContent = `${countdown} 秒后开始记忆`;
                } else {
                    clearInterval(countdownInterval);
                    startMemoryPhase();
                }
            }, 1000);

            const startMemoryPhase = () => {
                timerDisplay.textContent = '记住这些卡片！';

                let displayCount = displayTime / 1000;
                const displayInterval = setInterval(() => {
                    displayCount -= 0.1;
                    if (displayCount > 0) {
                        timerDisplay.textContent = `${displayCount.toFixed(1)} 秒`;
                    } else {
                        clearInterval(displayInterval);
                        hideCards();
                    }
                }, 100);
            };

            const hideCards = () => {
                timerDisplay.textContent = '卡片已隐藏！';

                cardElements.forEach(card => {
                    card.style.background = '#e0e0e0';
                    card.textContent = '❓';
                });

                targetDisplay.style.display = 'block';
                targetDisplay.classList.add('active');

                cardElements.forEach(card => {
                    card.addEventListener('click', () => {
                        const isCorrect = card.dataset.emoji === targetItem;

                        if (isCorrect) {
                            card.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
                            card.textContent = targetItem;
                            card.style.transform = 'scale(1.2)';
                            this.score += points;
                            this.updateScore();
                            this.showCelebration();

                            endlessLevel++;
                            setTimeout(createRound, 1500);
                        } else {
                            card.style.background = '#f44336';
                            card.style.transform = 'scale(0.9)';

                            setTimeout(() => {
                                card.style.background = '#e0e0e0';
                                card.textContent = '❓';
                                card.style.transform = 'scale(1)';
                            }, 500);

                            this.score = Math.max(0, this.score - Math.round(5 * difficultyMultiplier));
                            this.updateScore();
                        }
                    }, { once: true });
                });
            };
        };

        createRound();
    }

    // 字母配对 - 无限模式
    startLetterMatchEndless() {
        document.getElementById('game-title').textContent = '🔤 字母配对 - 无限';
        const gameArea = document.getElementById('game-area');

        const letters = [
            { upper: 'A', lower: 'a' },
            { upper: 'B', lower: 'b' },
            { upper: 'C', lower: 'c' },
            { upper: 'D', lower: 'd' },
            { upper: 'E', lower: 'e' },
            { upper: 'F', lower: 'f' },
            { upper: 'G', lower: 'g' },
            { upper: 'H', lower: 'h' },
            { upper: 'I', lower: 'i' },
            { upper: 'J', lower: 'j' },
            { upper: 'K', lower: 'k' },
            { upper: 'L', lower: 'l' },
            { upper: 'M', lower: 'm' },
            { upper: 'N', lower: 'n' },
            { upper: 'O', lower: 'o' },
            { upper: 'P', lower: 'p' },
            { upper: 'Q', lower: 'q' },
            { upper: 'R', lower: 'r' },
            { upper: 'S', lower: 's' },
            { upper: 'T', lower: 't' },
            { upper: 'U', lower: 'u' },
            { upper: 'V', lower: 'v' },
            { upper: 'W', lower: 'w' },
            { upper: 'X', lower: 'x' },
            { upper: 'Y', lower: 'y' },
            { upper: 'Z', lower: 'z' }
        ];

        let endlessRound = 0;

        const createRound = () => {
            endlessRound++;

            const cardCount = Math.min(4, 2 + Math.floor((endlessRound - 1) / 5));
            const shuffledLetters = [...letters].sort(() => Math.random() - 0.5);
            const selectedLetters = shuffledLetters.slice(0, cardCount);

            const difficultyMultiplier = Math.min(2.0, 1 + Math.floor(endlessRound / 10) * 0.1);
            const points = Math.round(10 * difficultyMultiplier);

            gameArea.innerHTML = `
                <div class="game-instruction">
                    <div>得分: ${this.score}</div>
                    <div>轮次: ${endlessRound}</div>
                    <div class="instruction-text">找到 ${selectedLetters[0].upper} 的写</div>
                </div>
                <div class="target-display">
                    <div class="target-emoji">${selectedLetters[0].upper}</div>
                    <div class="instruction-text">请找到 ${selectedLetters[0].lower} 的写</div>
                </div>
                <div class="items-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); gap: 15px; max-width: 400px;">
                    ${selectedLetters.map(letter => `
                        <div class="game-item letter-item" data-letter="${letter.lower}" data-correct="${letter.upper === selectedLetters[0].upper}">
                            ${letter.lower}
                        </div>
                    `).join('')}
                </div>
            `;

            const items = gameArea.querySelectorAll('.game-item');
            items.forEach(item => {
                this.addTouchFeedback(item);
                item.addEventListener('click', () => {
                    const isCorrect = item.dataset.correct === 'true';

                    if (isCorrect) {
                        item.classList.add('correct');
                        item.style.animation = 'correctAnswer 0.6s ease';
                        this.score += points;
                        this.updateScore();
                        this.showCelebration();
                        setTimeout(createRound, 1000);
                    } else {
                        item.classList.add('wrong');
                        item.style.animation = 'wrongAnswer 0.5s ease';
                        this.score = Math.max(0, this.score - Math.round(5 * difficultyMultiplier));
                        this.updateScore();
                        setTimeout(() => {
                            item.classList.remove('wrong');
                        }, 500);
                    }
                });
            });
        };

        createRound();
    }
}

console.log('✅ Games类已更新：修复了无限递归 BUG');
console.log('✅ startGame 方法现在会正确分发到具体游戏函数');
console.log('✅ 已添加无限挑战模式，每个游戏都有 Endless 方法');
console.log('✅ 控制台日志已添加，便于调试');
