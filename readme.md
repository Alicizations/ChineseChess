# 中国象棋UI（Javascript离线版）

中国象棋UI是为了帮助调试中国象棋AI而先行开发的一款基于Javascript和Crafty.js游戏引擎的象棋前端UI。该项目包括如下功能：

* 显示棋局，如页面显示残局的列表
* 单机双人对战，后期加入网络玩家和实现联机对战。
* 本地AI对战，后期加入网络玩家可与远程AI交互

这里可以查看基本的效果：[观棋不语](http://htmlpreview.github.io/?https://raw.githubusercontent.com/JimmyFromSYSU/ChineseChess_Javascript_UI/master/index.html)

## 基本元素
* game：整个游戏的接入口。对所有方形棋盘的游戏进行了抽象，包括黑白棋，五子棋，围棋等。
* board： 棋盘。
* chess： 棋子，包括颜色，种类，所属玩家等属性。可能扩展为牌类游戏中的纸牌。
* box：棋子选择框。

##player
目前考虑的玩家类包括UI玩家，AI玩家和Web玩家。

## 游戏流程
游戏流程采用事件驱动。

## 带加入功能

* 本地走子历史栈
* 本地计时器
