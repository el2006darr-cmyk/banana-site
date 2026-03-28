const nutrientTabs = document.querySelectorAll(".nutrient-tab");
const nutrientTitle = document.getElementById("nutrientTitle");
const nutrientText = document.getElementById("nutrientText");
const revealNodes = document.querySelectorAll(".reveal");
const countNodes = document.querySelectorAll("[data-count]");

const nutrientContent = {
  potassium: {
    title: "Калий",
    text: "Калий помогает поддерживать нормальную работу мышц и участвует в регулировании баланса жидкости. Поэтому бананы часто ассоциируют с активным образом жизни и восстановлением после нагрузки."
  },
  b6: {
    title: "Витамин B6",
    text: "Витамин B6 участвует в обменных процессах и помогает организму использовать питательные вещества более эффективно в повседневной жизни."
  },
  fiber: {
    title: "Клетчатка",
    text: "Клетчатка делает перекус более насыщаемым и помогает пище двигаться по пищеварительной системе мягче и спокойнее."
  },
  carbs: {
    title: "Углеводы",
    text: "Натуральные углеводы в банане помогают быстро получить энергию, что особенно удобно утром, в дороге и перед физической активностью."
  }
};

function setActiveTab(key) {
  const content = nutrientContent[key];
  if (!content) {
    return;
  }

  nutrientTitle.textContent = content.title;
  nutrientText.textContent = content.text;

  nutrientTabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.nutrient === key);
  });
}

nutrientTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setActiveTab(tab.dataset.nutrient);
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

revealNodes.forEach((node) => revealObserver.observe(node));

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }

    const node = entry.target;
    const target = Number(node.dataset.count);
    const duration = 1200;
    const startTime = performance.now();

    function animate(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.round(target * (1 - Math.pow(1 - progress, 3)));
      node.textContent = String(value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
    countObserver.unobserve(node);
  });
}, { threshold: 0.6 });

countNodes.forEach((node) => countObserver.observe(node));

setActiveTab("potassium");
