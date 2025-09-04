(function(){
	const starsEl = document.getElementById('stars');
	const meteorsEl = document.getElementById('meteors');
	if(!starsEl || !meteorsEl) return;
	const ww = window.innerWidth, wh = window.innerHeight;
	const numStars = Math.min(150, Math.floor((ww*wh)/12000));
	for (let i=0;i<numStars;i++){
		const s = document.createElement('div');
		s.className = 'star';
		s.style.left = Math.random()*100 + '%';
		s.style.top = Math.random()*100 + '%';
		const size = (Math.random()*2+1);
		s.style.width = size + 'px';
		s.style.height = size + 'px';
		s.style.animationDuration = (Math.random()*4+2)+'s';
		s.style.opacity = (Math.random()*0.5+0.4).toFixed(2);
		starsEl.appendChild(s);
	}
	for (let i=0;i<4;i++){
		const m = document.createElement('div');
		m.className = 'meteor';
		const width = (Math.random()*15+10);
		m.style.width = width + 'px';
		m.style.top = (Math.random()*20) + '%';
		m.style.left = (Math.random()*100) + '%';
		m.style.animationDuration = (Math.random()*3+3)+'s';
		m.style.animationDelay = (Math.random()*6)+'s';
		meteorsEl.appendChild(m);
	}
})();


