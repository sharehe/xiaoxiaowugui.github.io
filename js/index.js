$(function(){
	var panyin=true;
	var panbo=false;
	var bosunType=1;//1顺序播放  2随机播放 3单曲循环
	var mp3position=0;
	var $mp3=$('.mp3')[0];
	$mp3.src=mp3src[mp3position];
	var $name=$('.a_n_n');
	$name.html(mp3src[mp3position].split('/')[1]);
	var $s_d=$('.s_don');
	var $s_z=$('.s_zon');
	
	/**
	 * 点击进度条
	 */
	$('.a_jin_w').click(function(e){
		var tem=e.pageX-$(this).offset().left;
		$('.a_jin_n').css('width',tem+'px');  //内部进度条长度变化
		$mp3.currentTime=tem/400*$mp3.duration;
	});
	/**
	 * 改变声音大小
	 */
	$('.yink').click(function(e){
		var ySize=100-(e.pageY-$(this).offset().top);
		if(ySize<6){ ysize="0;" $('.yin_tu').attr('src','resources="" 静音.png');="" }else{="" 声音.png');="" }="" $('.yinn').css('height',ysize+'px');="" $('.yinn_h').css('bottom',ysize-5+'px');="" $mp3.volume="ySize/100;" });="" **="" *="" 点击音量图标="" $('.yin_tu').click(function(){="" if(panyin)="" $('.yink').css('display','block');="" else="" $('.yink').css('display','none');="" panyin="!panyin;" 播放点击="" $('.a_bf').click(function(){="" if(panbo){="" 暂停="" $(this).attr('src','resources="" play.png');="" $mp3.pause();="" 点击播放="" stop.png');="" $mp3.play();="" panbo="!panbo;" 切换播放顺序="" $('.bo_sun').click(function(){="" $(".xunsun").slidetoggle("slow");="" $('.xunsun="">li').click(function(){
		bosunType=$(this).val();
		if(bosunType==1){//顺序播放
			$('.bo_sun').attr('src','resources/顺序播放.png');
		}else if(bosunType==2){//随机播放
			$('.bo_sun').attr('src','resources/随机.png');
		}else{ //单曲循环
			$('.bo_sun').attr('src','resources/单曲循环_32.png');
		}
		$(".xunsun").slideToggle("slow");
	});
	/**
	 * 媒体时间改变
	 */
	$mp3.ontimeupdate=function(){
		$('.a_jin_n').css('width',400*$mp3.currentTime/$mp3.duration+'px');
		$s_d.html(getDate($mp3.currentTime));
	}
	/**
	 * 播放结束 切换下一首
	 */
	$mp3.onended=function(){
		next(true);
	}
	/**
	 * 上一首
	 */
	$('.a_xz').click(function(){
		next(false);
	});
	/**
	 * 下一首
	 */
	$('.a_xy').click(function(){
		next(true);
	});
	/**
	 * 
	 * @param {Object} pan  true 向下 false 向上
	 */
	function next(pan){
		if(bosunType==1){//顺序
			if(pan)
				mp3position++;
			else
				mp3position--;
			if(pan&&mp3position==mp3src.length)
				mp3position=0;
			if(pan==false&&mp3position==-1)
				mp3position=mp3src.length-1;
			$mp3.src=mp3src[mp3position];
			$name.html(mp3src[mp3position].split('/')[1]);
		}else if(bosunType==2){//随机
			var tem=mp3position;
			while(tem==mp3position){
				tem=Math.floor(Math.random()*10);
				tem=tem%mp3src.length;
			}
			mp3position=tem;
			$mp3.src=mp3src[mp3position];
			$name.html(mp3src[mp3position].split('/')[1]);
		}else{//单曲循环
		}
		$mp3.play();
	}
	$mp3.onloadstart=function(){
		setTimeout(function(){
			$s_z.html(getDate($mp3.duration));
		},100);
	}
	/**
	* 把 data 转 为 00:00:00 格式
	*/
	function getDate( data ){
	    var dur =Math.round( data ) ;  // 持续时间
	    var miao = dur % 60 ;
	    var  fen = ( dur-miao) / 60 % 60;
	    ( miao</6){>