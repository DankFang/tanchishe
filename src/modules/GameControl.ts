import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";
// 先用npm i 下载所有插件，即下载了node_modules文件夹
// npm run build 表示webpack打包并编译所有的代码
// npm start 表示打开实时刷新的浏览器
// 游戏控制器，控制其他类
class GameControl {
    // 定义三个属性
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;
    // 创建属性来存储蛇的移动方向（也就是按键的方向）
    direction: string = '';
    // 创建判断蛇是否活着的属性
    isLive: boolean = true;
    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();

        this.init();
    }
    // 游戏初始化方法，调用后游戏即开始
    init() {
        // keydown触发时，keydownHandler函数执行
        // bind(this)表示把这个对象始终绑定成gamecontrol的一个实例
        // 在 TypeScript 中，bind() 方法可以用来创建一个新的函数，该函数与原始函数具有相同的代码体和作用域，但其 this 值被绑定到指定的对象上。
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        this.run();
    }
    // 键盘响应函数
    keydownHandler(event: KeyboardEvent) {
        // console.log(this);

        // 获取用户按下的是哪个按键
        // console.log(event.key);

        this.direction = event.key;

    }
    // 控制蛇移动的方法
    run() {
        /**
         * 根据this.direction使得蛇位置改变     
         */
        let X = this.snake.X;
        let Y = this.snake.Y;
        // 根据按键方向修改XY值
        switch (this.direction) {
            case "ArrowUp":
            case "Up":
                Y -= 10;
                break;
            case "ArrowDown":
            case "Down":
                Y += 10;
                break;
            case "ArrowRight":
            case "Right":
                X += 10;
                break;
            case "ArrowLeft":
            case "Left":
                X -= 10;
                break;
        }
        this.checkEat(X, Y);

        try {
            // 可能会抛出异常的代码块
            // 以下代码相当于在调用snake类中的set方法，其中有异常抛出
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (error) {
            // 处理异常的代码
            alert(error)
            // 若不设置，则run方法一直调用，就一直弹窗
            this.isLive = false;
        }


        // 开启定时调用
        // 当isLive为true时才开启定时器
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
    }
    //      定义一个方法，检测蛇是吃到食物
    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            // return true;
            this.food.change();
            // 加分
            this.scorePanel.addScore();
            // 变长
            this.snake.addBody();
        }
    }
}
export default GameControl;