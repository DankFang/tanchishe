class Snake {
    // 表示获取蛇头的元素
    head: HTMLElement;
    // 表示蛇身体（包含蛇头），HTMLCollection是集合，实时刷新，往其中加入新元素时，会自动补充
    bodies: HTMLCollection;
    // 获取蛇的那个div容器
    element: HTMLElement;
    constructor() {
        this.element = document.getElementById('snake')!;
        // querySelector表示只获取其中的一个元素，这样看来就获取的是第一个元素，as HTMLElement表示类型断言
        this.head = document.querySelector('#snake > div') as HTMLElement;
        // getElementsByTagName() 方法可返回带有指定标签名的对象的集合
        this.bodies = this.element.getElementsByTagName('div');
    }
    // 获取蛇的坐标
    get X() {
        return this.head.offsetLeft;
    }
    get Y() {
        return this.head.offsetTop;
    }
    // 设置蛇头坐标
    set X(value: number) {
        if (this.X === value) {
            return;

        }
        // x的合法范围是0-290
        if (value < 0 || value > 290) {
            throw new Error('蛇撞墙了！Game Over.')
        }
        // 设置不能掉头
        // offsetLeft 是用于获取一个元素相对于其父元素的左侧边缘的距离（单位为像素）的属性。它返回一个数字类型的值。
        // 此时身体的第一节等于蛇头要设置的位置，则表明它发生掉头了
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            // console.log('水平方向发生掉头');
            // 若发生了掉头，则不掉头，按照原来的方向移动
            if (value > this.X) {
                // 若value大于旧值x，则说明本来向左走的蛇突然发生掉头了，应该让蛇按照原来的路向左
                value = this.X - 10;
            } else {
                value = this.X + 10;
            }

        }

        this.moveBody();
        this.head.style.left = value + 'px';
        this.checkHeadBody();
    }
    set Y(value: number) {

        if (this.Y === value) {
            return;

        }
        if (value < 0 || value > 290) {
            throw new Error('蛇撞墙了！Game Over.')
        }
        // 先判断有没有第二节，再看是否掉头
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            // console.log('水平方向发生掉头');
            // 若发生了掉头，则不掉头，按照原来的方向移动
            if (value > this.Y) {

                value = this.Y - 10;
            } else {
                value = this.Y + 10;
            }
        }
        this.moveBody();
        this.head.style.top = value + 'px';
        this.checkHeadBody();
    }
    // 蛇身体增加
    addBody() {
        // beforeend表示在结束标签之前的位置
        // 在element中加入一个div
        this.element.insertAdjacentHTML('beforeend', '<div></div>');
    }
    // 蛇身体移动的方法
    moveBody() {
        /**
         * 将后面的身体设置为前面的身体
         */
        // 遍历所有身体
        for (let i = this.bodies.length - 1; i > 0; i--) {
            // 获取前面身体的位置
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
            // 将值设置到当前身体上
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }
    // 检查撞到自己的方法
    checkHeadBody() {
        // 获取所有身体，检查是否跟蛇头坐标重叠
        for (let i = 1; i < this.bodies.length; i++) {
            if (this.X == (this.bodies[i] as HTMLElement).offsetLeft && this.Y == (this.bodies[i] as HTMLElement).offsetTop) {
                // 进入判断说明蛇撞到了自己
                throw new Error('撞到自己了，Game Over');
            }
        }

    }
}
export default Snake;