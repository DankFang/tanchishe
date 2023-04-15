class Food {
    // 定义一个属性表示食物对应的元素
    //   直接对应HTML中的元素 
    element: HTMLElement;
    constructor() {
        // ！表示我明白food不为空，直接传
        this.element = document.getElementById('food')!;
    }
    // 获取食物x轴坐标的方法\
    get X() {
        return this.element.offsetLeft;
    }
    // 获取食物Y轴坐标的方法\
    get Y() {
        return this.element.offsetTop;
    }
    // 修改食物的位置
    change() {
        // 食物位置最小是0，最大290（因为是正方形），坐标必须要被10整除
        // 蛇移动一次为一格，一格大小为10
        // Math.round(Math.random()*29) //此时是0-29的整数，包含0和29,round是四舍五入，random是0-1的数
        let top = Math.round(Math.random() * 29) * 10;
        let left = Math.round(Math.random() * 29) * 10;
        this.element.style.left = left + 'px';
        this.element.style.top = top + 'px';
    }
}
// 测试代码
// const food = new Food();
// console.log(food.X,food.Y);
// food.change();
// console.log(food.X,food.Y);
// 把food类作为默认模块暴露出去
export default Food;