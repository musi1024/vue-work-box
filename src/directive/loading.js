import './loading.css';
import Vue from 'vue';

Vue.directive('loading', function(el, binding) {
  if (binding.value) {
    let div = document.createElement('div');
    div.className = 'loading-wrapper';
    div.innerHTML = `
        <div class="loading-spinner">
          <div></div>
          <div></div>
          <div></div>
        </div>
      `;
    el.style.position = 'relative';
    el.appendChild(div);
    el.load = div;
  } else {
    el.load && el.load.parentNode && el.load.parentNode.removeChild(el.load);
  }
});
