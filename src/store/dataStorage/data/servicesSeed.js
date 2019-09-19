export const services =
  [
    {
      imageUrl: '../../static/HomePage/MainLogo.jpg',
      id: 'sdfdfddfghcvddgtsgh',
      title: 'Добре дошли в HackerClub.com',
      subDescription: 'Welcome to our website',
      description: 'Това е единственото място във Варна, предлагащо достъп до' +
      ' най-новите компютърни игри и високоскоростен интернет, както и' +
      ' професионално пълноцветно копиране, принтиране, разпечатване, ремонт' +
      ' и поддръжка на компютри,  набор на текст, корекция на документи, запис' +
      ' на CD и DVD и още много други услуги. ' +
      'Очакваме ви!'
    },

    {
      imageUrl: '../../static/HomePage/carouselImages/Printing.jpg',
      id: 'sdfdfsgh',
      title: 'Копирни услуги',
      //Determines the color of the row in Services.vue
      backgroundColor: 'accent',
      subDescription: 'Цветно и чернобяло копиране, принтиране и' +
      ' сканиране. Ламиниране в три формата.',
      description: 'Професионално копиране във формат А4 и А3.' +
      'Цветно и чернобяло принтиране и сканиране. ' +
      'Ламиниране във формат А5, А4 и А3.',
      price: {
          //Determines the color of the column in PriceList.vue
          color: 'accent',
          //Determines the number of rows in this column on each page
          index: {
            listStart: 0,
            listEnd: 7,
            turnLeft: false,
            turnRight: false,
            step: 7
          },
          //Determines the place of this column from left to right
          order: 3,
          priceDetails:
            [
              {serviceName: 'Черно-бяло', servicePrice: null},
              {serviceName: 'Принтиране (А4):', servicePrice: '10 ст/стр.'},
              {serviceName: 'Копиране (А4):', servicePrice: '10 ст/стр.'},
              {serviceName: 'Двустранно (А4):', servicePrice: '20 ст/стр.'},
              {serviceName: 'Принтиране (А3):', servicePrice: '20 ст/стр.'},
              {serviceName: 'Копиране (А3):', servicePrice: '20 ст/стр.'},
              {serviceName: 'Двустранно (А3):', servicePrice: '40 ст/л.'},
              {serviceName: 'Цветно', servicePrice: null},
              {serviceName: 'Принтиране (А4):', servicePrice: '1 лв/стр.'},
              {serviceName: 'Копиране (А4):', servicePrice: '1 лв/стр.'},
              {serviceName: 'Двустранно (А4):', servicePrice: '2 лв/стр.'},
              {serviceName: 'Принтиране (А3):', servicePrice: '2 лв/стр.'},
              {serviceName: 'Копиране (А3):', servicePrice: '2 лв/стр.'},
              {serviceName: 'Двустранно (А3):', servicePrice: '4 лв/л.'},
              {serviceName: 'Ламиниране', servicePrice: null},
              {serviceName: 'Лична карта:', servicePrice: '0,50 лв.'},
              {serviceName: 'до А4:', servicePrice: '0,80 лв.'},
              {serviceName: 'до А3:', servicePrice: '1,50 лв.'},
              {serviceName: 'Сканиране', servicePrice: null},
              {serviceName: 'А4 и А3:', servicePrice: '40 ст/стр.'},
            ]
        }
    },

    {
      imageUrl: '../../static/HomePage/carouselImages/play.jpg',
      id: 'asetsssssstydfg',
      title: 'Интернет, игри и забавления',
      //Determines the color of the row in Services.vue
      backgroundColor: 'primary',
      subDescription: 'Залата предлага достъп до Интернет' +
      ' и голямо разнообразие от актуални компютърни игри.',
      description: 'Високоскоростен и качествен достъп до интернет.' +
      ' Най-новите компютърни игри. Удобна и приятна обстановка,' +
      ' преференциални цени и промоцианални пакетни услуги.',
      price: {
          //Determines the color of the column in PriceList.vue
          color: 'primary',
          //Determines the number of rows in the column on each page
          index: {
            listStart: 0,
            listEnd: 7,
            turnLeft: false,
            turnRight: false,
            step: 7
          },
          //Determines the place of this column from left to right
          order: 2,
          priceDetails:
            [
              {serviceName: 'Стандартно', servicePrice: null},
              {serviceName: '30 минути:', servicePrice: '1,00 лв.'},
              {serviceName: '1 час:', servicePrice: '2,00 лв.'},
              {serviceName: 'С карта', servicePrice: null},
              {serviceName: 'Карта (4 часа):', servicePrice: '5,00 лв.'},
              {serviceName: 'Карта (10 часа):', servicePrice: '10,00 лв.'},
              {serviceName: 'Карта (25 часа):', servicePrice: '20,00 лв.'}
            ]
        }
    },

    {
      imageUrl: '../../static/HomePage/carouselImages/Diagnostics.jpg',
      id: 'asetyuiittydfg',
      title: 'Поправка на компютри',
      //Determines the color of the row in Services.vue
      backgroundColor: 'warning',
      subDescription: 'Диагностика, ремонт, преинсталация и поддръжка' +
      ' на компютърна техника',
      description: 'Инсталиране на операционна система на компютри и лаптопи,' +
      ' преинсталиране и разрешаване на проблеми, възникнали по време на работа.' +
      ' Инсталиране на драйвери за устройства и периферия, а също и на програми и' +
      ' приложен софтуер за работа, игри и други. Софтуерна профилактика, настройки' +
      ' и помощ при работа с компютър и интернет.',
      price: {
          //Determines the color of the column in PriceList.vue
          color: 'info',
          //Determines the number of rows in the column on each page
          index: {
            listStart: 0,
            listEnd: 7,
            turnLeft: false,
            turnRight: false,
            step: 7},
          //Determines the place of this column from left to right
          order: 4,
          priceDetails:
            [
              {serviceName: 'Услуги', servicePrice: null},
              {serviceName: 'Инсталация:', servicePrice: 'по договаряне'},
              {serviceName: 'Ремонт:', servicePrice: 'по договаряне'},
              {serviceName: 'Поддръжка:', servicePrice: 'по договаряне'},
              {serviceName: 'Обучение:', servicePrice: 'по договаряне'},
            ]
        }
    },

    {
      imageUrl: '../../static/HomePage/carouselImages/Operator.jpg',
      id: 'asetsdgjkuitydfg',
      title: 'Работа с оператор',
      //Determines the color of the row in Services.vue
      backgroundColor: 'success',
      subDescription: 'Набор и корекция на текст, изготвяне на документи,' +
      ' декларации, формуляри и презентации.',
      description: 'Набор на текст, корекция на документи, попълване на декларации' +
      ' и формуляри. Изготвяне на автобиографии, реферати и презентации. Запис на' +
      ' CD и DVD, прехвърляне на информация от/на флашка, телефон, карта.',
      price: {
          //Determines the color of the column in PriceList.vue
          color: 'success',
          //Determines the number of rows in the column on each page,
          index: {
            listStart: 0,
            listEnd: 6,
            turnLeft: false,
            turnRight: false,
            step: 6},
          //Determines the place of this column from left to right
          order: 1,
          priceDetails:
            [
              {serviceName: 'Работа с текст', servicePrice: null},
              {serviceName: 'Набор:', servicePrice: '2 лв/стр.'},
              {serviceName: 'Редакция:', servicePrice: '1-5 лв.'},
              {serviceName: 'Автобиография:', servicePrice: '2-5 лв.'},
              {serviceName: 'Декларации:', servicePrice: '2-5 лв.'},
              {serviceName: 'Формуляри:', servicePrice: '2-5 лв.'},
              {serviceName: 'Запис на информация', servicePrice: null},
              {serviceName: 'На Флашка:', servicePrice: '1-2 лв.'},
              {serviceName: 'На CD:', servicePrice: '2,50 лв.'},
              {serviceName: 'На CD + CD:', servicePrice: '3,00 лв.'},
              {serviceName: 'На DVD:', servicePrice: '4,00 лв.'},
              {serviceName: 'На DVD + DVD:', servicePrice: '5,00 лв.'},
              {serviceName: 'Работа Онлайн', servicePrice: null},
              {serviceName: 'E-mail:', servicePrice: '1,00 лв.'},
              {serviceName: 'Регистрации:', servicePrice: '1-5 лв.'},
              {serviceName: 'Публикации:', servicePrice: '1-5 лв.'},
              {serviceName: 'Допълнителни услуги', servicePrice: null},
              {serviceName: 'Курсова работа:', servicePrice: '5-40 лв.'},
              {serviceName: 'Дипломна работа:', servicePrice: '5-40 лв.'},
              {serviceName: 'Офис - ресурси:', servicePrice: '1-2 лв.'},
            ]
        }
    }
  ]
