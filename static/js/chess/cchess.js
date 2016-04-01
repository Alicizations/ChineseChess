/***********************************\
* 移动规则
\***********************************/

// 检查位置 p  是否在左上角为[r,c]，大小为(h, w)的矩形区域中
function inRegion(p, l, s){
	if(p.r>=l.r && p.r< l.r+s.h && p.c >= l.c && p.c < l.c + s.w) return true;
	else return false;
}

// 检查在棋盘b中，从p1到p2的最短曼哈顿路径上有多少个棋子，包括p1和p2点
// (如果p1=p2，只计算一次)
// 曼哈顿路径定义为先走斜线，再走直线的一条路径。
function countChess(chess, p1, p2){
	var cnt  = 0;
	var r = p1.r;
	var c = p1.c;

	while(r!=p2.r || c!=p2.c){
		if(chess[r][c]!=null) cnt++;
		if(p2.r > r) r++;
		if(p2.r < r) r--;
		if(p2.c > c) c++;
		if(p2.c < c) c--;
	}
	
	if(chess[r][c]!=null) cnt++;

	return cnt;
}

//给一个棋盘，检查是否能将在[old_row, old_col]当中的棋子移动到[new_row,new_col]作为合法的一步。
function normalCheck(chess, old, now)
{
	// 自己走向自己非法
	if (old.r == now.r && old.c == now.c) return false;

	// 边界越界
	if(!inRegion(old,{r:0,c:0},{h:10,w:9})) return false;
	if(!inRegion(now,{r:0,c:0},{h:10,w:9})) return false;

	var s = chess[old.r][old.c];
	var t = chess[now.r][now.c];
	var cnt = countChess(chess, now, old);

	// 路障太多
	if(cnt > 3) return false;

	// 起点没有棋子
	if(s == null) return false;

	// 吃到自己的子
	if(t!=null && s.player == t.player) return false;

	// dx dy 有向距离
	// x y 无向距离
	var dr = now.r - old.r;
	var dc = now.c - old.c;
	var r = dr>0?dr:-dr;
	var c = dc>0?dc:-dc;

	if(s.type == "jiang"){
		if(s.player == 0 && !(inRegion(now, {r:0,c:3},{h:3,w:3} ))) return false;
		if(s.player == 1 && !(inRegion(now, {r:7,c:3},{h:3,w:3} ))) return false;
		if( !((r==1 && c==0) || (r==0 && c==1) ) ) 
			return false;
	}
	else if(s.type == "ju"){
		if(r!=0 && c!=0) return false;
		if(cnt > 2) return false;
		if(cnt == 2 && t==null) return false;
	}
	else if(s.type == "pao"){
		if(r!=0 && c!=0) return false;
		if(cnt == 3 && t==null) return false;
		if(cnt == 2) return false;
	}
	else if(s.type == "ma"){
		if( !( (r==1&&c==2) || (r==2&&c==1)) ) return false;
		if(cnt > 2) return false;
		if(cnt == 2 && t==null) return false;
	}
	else if(s.type == "shi"){
		if(s.player == 0 && !(inRegion(now, {r:0,c:3},{h:3,w:3}))) return false;
		if(s.player == 1 && !(inRegion(now, {r:7,c:3},{h:3,w:3}))) return false;
		if( !(r==1&&c==1) ) return false;
	}
	else if(s.type == "xiang"){
		// region
		if(s.player == 0 && !(inRegion(now, {r:0,c:0},{h:5,w:9}))) return false;
		if(s.player == 1 && !(inRegion(now, {r:5,c:0},{h:5,w:9}))) return false;

		if( !(r==2&&c==2)) return false;
		if(cnt > 2) return false;
		if(cnt == 2 && t==null) return false;
	}
	else if(s.type == "zu"){
		if(s.player == 0 && dr < 0) return false;
		if(s.player == 1 && dr > 0) return false;

		if(s.player == 0 && inRegion(now, {r:0,c:0},{h:5,w:9}) ){
			if(c != 0) return false;
			if(r != 1) return false;
		}
		else{
			if(!( (r==0 && c==1) || (r==1 && c== 0) )) return false;
		}

		if(s.player == 1 && inRegion(now, {r:5,c:0},{h:5,w:9}) ){
			if(c != 0) return false;
			if(r != 1) return false;
		}
		else{
			if(!( (r==0 && c==1) || (r==1 && c == 0) )) return false;
		}
	}
	return true;
}


var ChineseChessGame = {
	imgFileName:	["jiang.png",	"ju.png",	"ma.png",	"xiang.png",	"shi.png",	"pao.png",	"zu.png"],
	chessType:		["jiang",		"ju",		"ma",		"xiang",		"shi",		"pao",		"zu"],
	chessColor: ['b', 'r'],
	createNew: function(area, cell_size, cell_img_size,  box_img_size, b_img_w, b_img_h, chess_img_size, img_dir){
		var game = SquareChessGame.createNew(area, cell_size, cell_img_size,  box_img_size, b_img_w, b_img_h, chess_img_size, img_dir, bg_color,cell_size/2, cell_size/2);


		/***********************************\
		 * 游戏参数计算
		\***********************************/
		// 棋网格盘大小
		var n_row = 10;
		var n_col = 9;
		chess = new Array(n_row);
		for(var i = 0; i < n_row;i++){
			chess[i] = new Array(n_col);
		}
		game.getChess = function(pos){
			return chess[pos.r][pos.c];
		}

		/***********************************\
		 * UI显示
		\***********************************/
		game.UI_playing = false;

		// 设置鼠标跟随框 
		game.moveMouse = function(e){
			if(game.UI_playing == false) return;
			var p = {x:e.offsetX, y:e.offsetY};
			if(p.x>=0 && p.x < game.w && p.y>=0 && p.y< game.h){
				var now  = game.getClickPos(p, cell_size/2);
				if(now.r < 0 || now.r >= n_row) return;
				if(now.c < 0 || now.c >= n_col) return;
				if(game.box2.sprite.z<0) game.setChessTo(game.box2, now);
				//else game.moveChessTo(game.box2, now);
				else game.setChessTo(game.box2, now);
			}
		}

		game.fix = function(){
			game.moveMouse = null;
			game.hide(game.box1);	
			game.hide(game.box2);	
		}

		// 移动棋子
		// pre-condition：移动绝对合法，已通过检验
		game.moveOnce = function(step) {
				game.setChessTo(game.box, step.to);
				
				eat_chess = game.getChess(step.to);

				game.updateChess = function(){
					game.hide(eat_chess);
					tmp_chess.sprite.z = 1;
				}

				tmp_chess = chess[step.from.r][step.from.c];
				game.moveChessTo(tmp_chess, step.to);
				chess[step.from.r][step.from.c] = null;
				chess[step.to.r][step.to.c] = tmp_chess; 
		}

		/***********************************\
		 * 设置规则检验函数，外部可改变
		\***********************************/
		game.checkMove = function(step){
			return normalCheck(chess, step.from, step.to);
		}



		/***********************************\
		 * 初始化棋子位置，加载棋子和棋盘精灵
		\***********************************/
		var pos ={ 
			player :{b:0,r:1},
			b : [
				[[0,4]],
			[[0,0],[0,8]],
			[[0,1],[0,7]],
			[[0,2],[0,6]],
			[[0,3],[0,5]],
			[[2,1],[2,7]],
			[[3,0], [3,2], [3,4], [3,6], [3,8] ]
				],
			r : [
				[[9,4]],
			[[9,0],[9,8]],
			[[9,1],[9,7]],
			[[9,2],[9,6]],
			[[9,3],[9,5]],
			[[7,1],[7,7]],
			[[6,0], [6,2], [6,4], [6,6], [6,8] ]
				],
		};

		game.setPos = function(newPos){
			pos = newPos;
		}

		/***********************************\
		 * run 
		\***********************************/
		game.run = function(crafty){
			Crafty.init(game.w, game.h, document.getElementById(area));
			/***********************************\
			 * board 生成 
			\***********************************/
			game.loadBoard();
			//game.sprite.bind('MouseUp', game.control);
			game.sprite.bind('MouseMove', game.moveMouse);


			/***********************************\
			 * box 生成 
			\***********************************/
			game.box2 = ChineseChess.createNew(box_img_size, box2_img_file, chess_size, "+", -1, -1, 0,0,0);	
			game.box2.loadChess(game);
			game.hide(game.box2);

			game.box = ChineseChess.createNew(box_img_size, box_img_file, chess_size, "+", -1, -1, 0,0,0);	
			game.box.loadChess(game);
			game.hide(game.box);

			/***********************************\
			 * 棋子 生成 
			\***********************************/
			initChess = function (img_file, position, player, type) {
				for (var i = 0; i < position.length; i++) {
					var pos = {};
					pos.r = position[i][0];
					pos.c = position[i][1];
					c = ChineseChess.createNew(chess_img_size, img_file, chess_size,  "+", type, player, 0,0, 1);
					chess[pos.r][pos.c] = c; 
					c.loadChess(game);
					game.setChessTo(c, pos);
				}
			}
			ChineseChessGame.chessColor.forEach(function(color,s){
				ChineseChessGame.chessType.forEach(function(type, t){
					initChess(chess_img_dir + color+"_" + ChineseChessGame.imgFileName[t], pos[color][t], pos['player'][color], type);
				});
			});

			game.start();
		}

		return game;
	}
};


/***********************************\
* 象棋棋子类 
\***********************************/
var ChineseChess = {
	createNew: function(img_size, img_file, size, color, type, player, x,y,z,name){
		var chess = Chess.createNew(img_size, img_file, size, color, type, player, x,y,z,name);
		return chess;
	}
}




