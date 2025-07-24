document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  const preloaderText = document.getElementById('preloader-text');
  const startBtn = document.getElementById('startBtn');
  const videoContainer = document.getElementById('video-container');
  const video = document.getElementById('aboutVideo');
  const aboutContent = document.getElementById('aboutContent');
  const backHome = document.getElementById('backHome');

  function showText(text) {
    preloaderText.innerHTML = text; // Use HTML to keep <br> and <em>
  }

  async function runPreloader() {
    showText('Make sure you have turned on sound to 70% for best experience.');
    await new Promise(r => setTimeout(r, 2000));

    showText('“Life is a race. If you don’t run fast, you’ll be like a broken anda.”');
    await new Promise(r => setTimeout(r, 4000));

    preloader.style.display = 'none';
    videoContainer.style.display = 'block';

    video.volume = 0.7;
    video.play().catch(err => console.log(err));
  }

  startBtn.onclick = () => {
    runPreloader();
  };

  video.onended = () => {
    videoContainer.style.display = 'none';
    aboutContent.style.display = 'block';
    document.body.style.overflow = 'auto';
  };

  if (backHome) {
    backHome.onclick = () => {
      window.location.href = 'index.html';
    };
  }
});
