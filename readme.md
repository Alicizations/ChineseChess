# 中国象棋UI（Javascript离线版）

"观棋不语" 是一款让理查德.狄克.强输得心服口服，无话可说而开发的中国象棋AI。中国象棋UI则是帮助调试"观棋不语"而先行开发的一款基于Javascript和Crafty.js游戏引擎的象棋前端UI。

## Demo
由于使用htmlpreview进行的展示，可能加载会比较缓慢。

* 人人对战：[人人对战](http://htmlpreview.github.io/?https://raw.githubusercontent.com/JimmyFromSYSU/ChineseChessUI_Javascript/master/UIUI.html)  
* 人机对战：[人机对战](http://htmlpreview.github.io/?https://raw.githubusercontent.com/JimmyFromSYSU/ChineseChessUI_Javascript/master/UIAI.html)  
* 机机对战：[观棋不语](http://htmlpreview.github.io/?https://raw.githubusercontent.com/JimmyFromSYSU/ChineseChessUI_Javascript/master/AIAI.html)  
* 残局对战：[一虎下山](http://htmlpreview.github.io/?https://raw.githubusercontent.com/JimmyFromSYSU/ChineseChessUI_Javascript/master/end.html)  

在残局对战中，由AI先手解残局。该残局需要9~10步的棋力才能解开，目前前台AI的棋力只有4步。

## 基本元素
* game：外部调用的接入点。
* board： 棋盘。对所有方形棋盘的游戏进行了抽象，包括黑白棋，五子棋，围棋等。
* chess： 棋子，包括颜色，种类，所属玩家等属性。可能扩展为牌类游戏中的纸牌。
* box：棋子选择框，用于指示游戏移动棋子过程。

##player
目前考虑的玩家类包括UI玩家，AI玩家和Web玩家。

* 单机双人对战（UI玩家），后期加入网络玩家和实现联机对战。
* 本地人机对战或AI间对战（AI玩家），后期加入网络玩家可与远程AI交互。

## 游戏流程
游戏流程采用事件驱动。在开始移动棋子前后，以及游戏结束等情况下，产生一个对应的事件，并通过设置监听函数完成游戏过程。

## 已完成功能
* 基本棋局显示。
* 游戏流程和基本UI玩家。
* 胜负判别。
* 可设置任意初始布局。
* 走子生成器：自动走子和AI算法基础。
* 玩家认输，直接发送GameOver事件。(need test)
* 离线AI玩家：一个简单的AI实现。

## 待加入功能
* 网络玩家：需要后台服务器提供联机，棋局记录以及AI等服务。（至此可以正式开始较强中国象棋AI的开发）。
* 本地走子历史栈：悔棋功能。
* 本地计时器：定时不走子的一方强制走子。
* - 同以页面显示多个静态棋局。
