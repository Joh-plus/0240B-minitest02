// ============================================
// 小テスト案内：タイムライン版 共通スクリプト
// ============================================
// 1) 手順番号（手順n / 1,2,3...）を自動出力
// 2) 右ペイン目次を自動生成（増減に強い）
// 3) 既存UI：試験概要の開閉、ハンバーガー、文字サイズ、ハイライト、色変更
// 4) 現在位置：スクロールに合わせて目次を強調
// ============================================

(function () {
  'use strict';

  // ----------------------------
  // 0) 便利関数
  // ----------------------------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ----------------------------
  // 1) 手順番号の自動出力
  // ----------------------------
  const stepSections = $$('.timeline-item[id^="step"]');

  stepSections.forEach((sec, i) => {
    const stepNo = i + 1;

    // 左の「手順n」ラベル（.timeline-tag > span）
    const tagSpan = $('.timeline-tag span', sec);
    if (tagSpan) tagSpan.textContent = `手順${stepNo}`;

    // 丸囲み番号（.timeline-dot）
    const dot = $('.timeline-dot', sec);
    if (dot) dot.textContent = `${stepNo}`;

    // パネルタイトル（.panel-title）
    const panelTitle = $('.panel-title', sec);
    if (panelTitle) panelTitle.textContent = `【 手順 ${stepNo} 】`;

    // サブタイトル（.panel-sub-title）
    const subs = $$('.panel-sub-title', sec);
    subs.forEach((el, j) => {
      el.textContent = `手順 ${stepNo}-${j + 1}`;
    });

    // 目次生成用に「見出しテキスト」をデータ属性に保存
    // - 手順1：はじめに などの「章タイトル」として使う
    const h3 = sec.querySelector('.question__heading h3');
    if (h3) {
      // h3の中には panel-title も含まれるので、cloneして panel-title を除外
      const clone = h3.cloneNode(true);
      const pt = clone.querySelector('.panel-title');
      if (pt) pt.remove();
      const titleText = clone.textContent.replace(/\s+/g, ' ').trim();
      sec.dataset.indexTitle = titleText;
    }
  });

  // ----------------------------
  // 2) 右ペイン目次の自動生成
  // ----------------------------
  const indexList = $('.index-list');
  if (indexList && stepSections.length) {
    indexList.innerHTML = '';
    stepSections.forEach((sec, i) => {
      const stepNo = i + 1;
      const id = sec.id;
      const title = sec.dataset.indexTitle ? sec.dataset.indexTitle : '';
      const text = title ? `手順${stepNo}：${title}` : `手順${stepNo}`;

      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${id}`;
      a.textContent = text;
      li.appendChild(a);
      indexList.appendChild(li);
    });
  }

  // 目次リンクを再取得（自動生成後）
  const indexLinks = $$('.index-list a');

  // スムーススクロール（クリック時）
  indexLinks.forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const href = a.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        // 少し上（20px程度）に余裕を持たせてスクロール
        const offset = 20;
        const bodyRect = document.body.getBoundingClientRect().top;
        const targetRect = target.getBoundingClientRect().top;
        const targetPosition = targetRect - bodyRect;
        const offsetPosition = targetPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  const sectionsForSpy = indexLinks
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  // ----------------------------
  // 3) 試験概要（クリックで開閉）
  // ----------------------------
  const heading = $('.contents__heading h2');
  const info = $('.info');
  if (heading && info) {
    heading.addEventListener('click', () => {
      heading.classList.toggle('open');
      if (heading.classList.contains('open')) {
        info.style.height = info.scrollHeight + 'px';
      } else {
        info.style.height = '0px';
      }
    });
  }

  // ----------------------------
  // 4) サイドメニュー（ハンバーガー）
  // ----------------------------
  const humb = $('.humb');
  const subMenu = $('.sub-menu');
  const closeBtn = $('.close-btn');
  const overlay = $('.overlay');

  const openMenu = () => {
    if (humb) humb.classList.add('on');
    if (subMenu) subMenu.classList.add('open');
    if (overlay) {
      overlay.classList.add('on');
      overlay.style.height = '100vh';
      overlay.style.backgroundColor = 'rgba(0,0,0,0.35)';
      overlay.style.pointerEvents = 'auto';
    }
  };

  const closeMenu = () => {
    if (humb) humb.classList.remove('on');
    if (subMenu) subMenu.classList.remove('open');
    if (overlay) {
      overlay.classList.remove('on');
      overlay.style.height = '0';
      overlay.style.backgroundColor = 'rgba(0,0,0,0)';
      overlay.style.pointerEvents = 'none';
    }
  };

  if (humb) {
    humb.addEventListener('click', () => {
      if (subMenu && subMenu.classList.contains('open')) closeMenu();
      else openMenu();
    });
  }
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  // ----------------------------
  // 5) 文字サイズ（大/中/小）
  // ----------------------------
  const root = document.documentElement;
  const sizeButtons = $$('.font-size-button-list__item');
  sizeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeButtons.forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
      const label = btn.textContent.trim();
      if (label === '大') root.style.fontSize = '112%';
      if (label === '中') root.style.fontSize = '100%';
      if (label === '小') root.style.fontSize = '92%';
    });
  });

  // ----------------------------
  // 6) ハイライトモード（見出しクリックで強調）
  // ----------------------------
  const toggle = $('.toggle-button');
  const contents = $('.contents');
  if (toggle && contents) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('on');
      contents.classList.toggle('highlight-mode');
    });

    contents.addEventListener('click', (e) => {
      if (!contents.classList.contains('highlight-mode')) return;
      const h4 = e.target.closest('.question__item h4');
      if (!h4) return;
      const item = h4.closest('.question__item');
      if (!item) return;
      $$('.question__item', contents).forEach(el => el.classList.remove('current-highlight'));
      item.classList.add('current-highlight');
      item.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  // ----------------------------
  // 7) カラー変更（CSS変数 --main-c / --main-c2 を更新）
  // ----------------------------
  const picker = $('.color-picker');
  const reset = $('.color-reset');
  const defaultMain = getComputedStyle(root).getPropertyValue('--main-c').trim() || '#1d4ed8';

  const setTheme = (color) => {
    root.style.setProperty('--main-c', color);
    root.style.setProperty('--main-c2', color);
  };

  if (picker) {
    picker.addEventListener('input', (e) => setTheme(e.target.value));
  }
  if (reset) {
    reset.addEventListener('click', (e) => {
      e.preventDefault();
      if (picker) picker.value = defaultMain;
      setTheme(defaultMain);
    });
  }

  // ----------------------------
  // 8) 右ペイン：現在位置の強調（スクロール追従）
  // ----------------------------
  if ('IntersectionObserver' in window && sectionsForSpy.length) {
    const io = new IntersectionObserver((entries) => {
      // 画面内に入ったもののうち、上側に近いものを優先
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (!visible) return;

      indexLinks.forEach(a => a.classList.remove('is-active'));
      const active = indexLinks.find(a => a.getAttribute('href') === '#' + visible.target.id);
      if (active) active.classList.add('is-active');
    }, { root: null, threshold: 0.35 });

    sectionsForSpy.forEach(sec => io.observe(sec));
  }

  // ----------------------------
  // 9) サイドバー：解答チェックリストの制御
  // ----------------------------
  const checkInputs = $$('.task-check');
  const countVal = $('.count-val');

  const updateChecklist = () => {
    let uncheckCount = 0;
    checkInputs.forEach(input => {
      const li = input.closest('li');
      if (input.checked) {
        li.classList.add('is-checked');
        li.classList.remove('is-unchecked');
      } else {
        li.classList.remove('is-checked');
        li.classList.add('is-unchecked');
        uncheckCount++;
      }
    });
    if (countVal) countVal.textContent = uncheckCount;
  };

  if (checkInputs.length) {
    checkInputs.forEach(input => {
      input.addEventListener('change', updateChecklist);
    });
    // 初期実行
    updateChecklist();
  }

})();
