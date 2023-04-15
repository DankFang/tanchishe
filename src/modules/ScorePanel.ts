// 定义记分牌类
class ScorePanel {
    //设置变量限制等级
    maxLevel: number;
    // 设置每多少分升级
    upScore: number;
    score: number = 0;
    level: number = 1;
    scoreEle: HTMLElement;
    levelEle: HTMLElement;
    // maxLevel:number=10表示默认值是10.若没传入参数，就默认10
    constructor(maxLevel: number = 10, upScore: number = 10) {
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }
    // 设置加分的方法
    addScore() {
        this.score++;
        // innerHTML表示html里的字符串
        // 下面拼串就是让this.score变成字符串？
        this.scoreEle.innerHTML = this.score + '';
        if (this.score % this.upScore === 0) {
            this.levelUp();
        }
    }


    // 提升等级的方法
    levelUp() {
        if (this.level < this.maxLevel) {
            this.level++;
            this.levelEle.innerHTML = this.level + '';
        }

    }
}
// 把food类作为默认模块暴露出去
export default ScorePanel;