  // MENU MOBILE
let btnAbrirMenu = document.getElementById('btn-abrir-menu')
let btnFecharMenu = document.getElementById('btn-fechar-menu')
let itensMenu = document.getElementById('itens-menu')
let overlay = document.getElementById('overlay-menu')
let menu = document.getElementById('menu-mobile')

btnAbrirMenu.addEventListener('click', ()=> {
  menu.classList.add('abrir-menu')
})

btnFecharMenu.addEventListener('click', ()=> {
  menu.classList.remove('abrir-menu')
})

itensMenu.addEventListener('click', ()=> {
  menu.classList.remove('abrir-menu')
})

overlay.addEventListener('click', ()=> {
  menu.classList.remove('abrir-menu')
})


  
  // PORTFÓLIO - CARROSSEL
new Swiper('.card-wrapper', {
    loop: true, //loop dos slides
    spaceBetween: 30, // espaçamento de 30px entre cada slide
  
    pagination: {
      el: '.swiper-pagination', // definir local que o botão é criado
      clickable: true,  // botão para mudar de slide
      dynamicBullets: true // botão se ajustar conforme o número de slides

    },

  // botoes de navegação
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  // ajustando tela
    breakpoints: {
        0: {
            slidesPerView:1
        },
        768: {
            slidesPerView:2
        },
        1024: {
            slidesPerView:3
        }
    },
  });



  // SKILLS
const cardItemsHtml = document.querySelector('.card-item.html');
const cardItemsCss = document.querySelector('.card-item.css');
const cardItemsJs = document.querySelector('.card-item.js');
const cardItemsPython = document.querySelector('.card-item.python');

const skillBoxHtml = document.querySelector('.skill-box.html');
const skillBoxCss = document.querySelector('.skill-box.css');
const skillBoxJs = document.querySelector('.skill-box.javascript');
const skillBoxPython = document.querySelector('.skill-box.python');

function hideAllSkills() {
    skillBoxHtml.style.display = 'none';
    skillBoxCss.style.display = 'none';
    skillBoxJs.style.display = 'none';
    skillBoxPython.style.display = 'none';
}

// card-item HTML
cardItemsHtml.addEventListener('click', function() {
    hideAllSkills();
    skillBoxHtml.style.display = 'block'; 
});

// card-item CSS
cardItemsCss.addEventListener('click', function() {
    hideAllSkills();
    skillBoxCss.style.display = 'block'; 
});

// card-item JS
cardItemsJs.addEventListener('click', function() {
    hideAllSkills();
    skillBoxJs.style.display = 'block';
});

// card-item PYTHON
cardItemsPython.addEventListener('click', function() {
    hideAllSkills();
    skillBoxPython.style.display = 'block';
});



// FORMULÁRIO DE CONTATO
class FormSubmit {
  constructor(settings) {
    this.settings = settings;
    this.form = document.querySelector(settings.form);
    this.formButton = document.querySelector(settings.button);
    if (this.form) {
      this.url = this.form.getAttribute("action");
    }
    this.sendForm = this.sendForm.bind(this);
  }

  displaySuccess() {
    this.form.innerHTML = this.settings.success;
  }

  displayError() {
    this.form.innerHTML = this.settings.error;
  }

  getFormObject() {
    const formObject = {};
    const fields = this.form.querySelectorAll("[name]");
    fields.forEach((field) => {
      formObject[field.getAttribute("name")] = field.value;
    });
    return formObject;
  }

  onSubmission(event) {
    event.preventDefault();
    event.target.disabled = true;
    event.target.style = "font-size: larger; background-color: #ffc5d4; color: #5D544D;"
    event.target.innerText = "Enviando...";
  }

  async sendForm(event) {
    try {
      this.onSubmission(event);
      await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(this.getFormObject()),
      });
      this.displaySuccess();
    } catch (error) {
      this.displayError();
      throw new Error(error);
    }
  }

  init() {
    if (this.form) this.formButton.addEventListener("click", this.sendForm);
    return this;
  }
}

const formSubmit = new FormSubmit({
  form: "[data-form]",
  button: "[data-button]",
  success: "<h1 class='success'>Mensagem enviada!</h1>",
  error: "<h1 class='error'>Não foi possível enviar sua mensagem.</h1>",
});
formSubmit.init();