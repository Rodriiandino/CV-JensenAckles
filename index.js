const d = document,
  w = window;

d.addEventListener('DOMContentLoaded', (e) => {
  contactForm();
  carousel();
  hamburgerMenu('.panel-btn', '.sticky-nav', '.menu a');
  scrollTopBotton('.proyectos');
});

function contactForm() {
  const $form = d.querySelector('.contact-form'),
    $inputs = d.querySelectorAll('.contact-form [required]');

  $inputs.forEach((input) => {
    const $span = d.createElement('span');
    $span.id = input.name;
    $span.textContent = input.title;
    $span.classList.add('contact-form-error', 'none');
    input.insertAdjacentElement('afterend', $span);
  });

  d.addEventListener('keyup', (e) => {
    if (e.target.matches('.contact-form [required]')) {
      let $input = e.target,
        pattern = $input.pattern || $input.dataset.pattern;
      if (pattern && $input.value !== '') {
        let regex = new RegExp(pattern);
        return !regex.exec($input.value)
          ? d.getElementById($input.name).classList.add('is-active')
          : d.getElementById($input.name).classList.remove('is-active');
      }

      if (!pattern) {
        return $input.value === ''
          ? d.getElementById($input.name).classList.add('is-active')
          : d.getElementById($input.name).classList.remove('is-active');
      }
    }
  });

  d.addEventListener('submit', (e) => {
    // e.preventDefault();
    alert('Enviando Formulario');

    const $loader = d.querySelector('.contact-form-loader'),
      $response = d.querySelector('.contact-form-response');

    $loader.classList.remove('none');

    setTimeout(() => {
      $loader.classList.add('none');
      $response.classList.remove('none');
      $form.reset();

      setTimeout(() => {
        $response.classList.add('none');
      }, 3000);
    }, 3000);
  });
}

function carousel() {
  const $buttonPrev = d.getElementById('button-prev');
  const $buttonNext = d.getElementById('button-next');
  const $track = d.getElementById('track');
  const $pictureList = d.getElementById('picture-list');
  const $slick = d.querySelectorAll('.slick');

  const slickWidth = $slick[0].offsetWidth; //Consigo el ancho de las imagenes

  function Move(value) {
    const trackWidth = $track.offsetWidth; //ancho de la galeria completa
    const listWidth = $pictureList.offsetWidth; //ancho de la galeria visible en pantalla

    $track.style.left == ''
      ? (leftPosition = $track.style.left = 0)
      : (leftPosition = parseFloat($track.style.left.slice(0, -2) * -1));

    if (leftPosition < trackWidth - listWidth && value == 2) {
      $track.style.left = `${-1 * (leftPosition + slickWidth)}px`;
    } else if (leftPosition > 0 && value == 1) {
      $track.style.left = `${-1 * (leftPosition - slickWidth)}px`;
    }
  }

  $buttonPrev.onclick = () => Move(1);
  $buttonNext.onclick = () => Move(2);
}

function hamburgerMenu(panelBtn, panel, menuLink) {
  const d = document;

  d.addEventListener('click', (e) => {
    if (e.target.matches(panelBtn) || e.target.matches(`${panelBtn} *`)) {
      d.querySelector(panel).classList.toggle('is-active');
      d.querySelector(panelBtn).classList.toggle('is-active');
    }

    if (e.target.matches(menuLink)) {
      d.querySelector(panel).classList.remove('is-active');
      d.querySelector(panelBtn).classList.remove('is-active');
    }
  });
}

function scrollTopBotton(btn) {
  d.addEventListener('click', (e) => {
    if (e.target.matches(btn)) {
      w.scrollTo({
        behavior: 'smooth',
        top: 140,
      });
    }
  });
}
