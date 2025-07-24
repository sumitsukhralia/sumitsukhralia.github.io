document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  const preloaderText = document.getElementById('preloader-text');
  const videoContainer = document.getElementById('video-container');
  const video = document.getElementById('aboutVideo');
  const aboutContent = document.getElementById('aboutContent');
  const backHome = document.getElementById('backHome'); // ✅ Make sure your button has this ID!

  function showText(text) {
    preloaderText.textContent = text;
  }

  async function runPreloader() {
    showText('Be ready...');
    await new Promise(r => setTimeout(r, 2000));

    showText('Make sure you have turned on sound to 70% for best experience.');
    await new Promise(r => setTimeout(r, 2000));

    showText('“Life is a race, if you don’t run fast, you’ll be a broken anda.”');
    await new Promise(r => setTimeout(r, 4000));

    // ✅ End preloader, start video
    preloader.style.display = 'none';
    videoContainer.style.display = 'block';

    video.volume = 0.7; // ✅ Volume to 70%
    video.play();
  }

  video.onended = () => {
    videoContainer.style.display = 'none';
    aboutContent.style.display = 'block';
    document.body.style.overflow = 'auto'; // allow scroll again
  };

  if (backHome) {
    backHome.onclick = () => {
      window.location.href = 'index.html';
    };
  }

  runPreloader();
});
