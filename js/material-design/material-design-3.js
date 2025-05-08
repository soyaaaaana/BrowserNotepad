// Start ===== Material Design 3 =====

class MaterialDesign3Fix {
  static refreshComponents() {
    // 「field-sizing: content」に対応
    {
      const elements = document.querySelectorAll('md-outlined-text-field[type="textarea"], md-filled-text-field[type="textarea"]');
      Array.from(elements).forEach(element => {
        if (element.style?.["field-sizing"] == "content") {
          const shadow_root = element.shadowRoot;
          const field = shadow_root.querySelector("span.text-field .field");
          field.removeAttribute("resizable");
          field.shadowRoot.querySelector("div.field div.container-overflow div.container").removeAttribute("style");
          const textarea = field.querySelector("textarea.input");
          textarea.style["min-height"] = "3.0lh";
          element.style["width"] = "100%";
          // textarea.style.width = "100%";
          textarea.style["field-sizing"] = "content";
          function setMaxWidth() {
            textarea.style["max-width"] = `calc(${field.offsetWidth}px - 2rem)`;
          }
          new ResizeObserver(() => {
            setMaxWidth();
          }).observe(field);
        }
      });
    }
    // テキストフィールド関連の機能改善（marginとpaddingを調整して端っこをクリックしてもinput/textareaがフォーカスされるように + labelを選択不可に + typeがcolorのときのpadding調整 + typeがcolorのときのカーソル変更）
    {
      const elements = document.querySelectorAll("md-outlined-text-field, md-filled-text-field");
      Array.from(elements).forEach(element => {
        if (element.getAttribute("type") == "textarea") {
          const textarea = element.shadowRoot.querySelector("span.text-field .field textarea");
          textarea.style.margin = "0px";
          textarea.style.padding = "1rem";
        }
        else {
          const input_wrapper = element.shadowRoot.querySelector("span.text-field .field div.input-wrapper");
          input_wrapper.style.padding = "0px";
          const input = input_wrapper.querySelector(".input");
          let padding = "1rem";
          if (element.getAttribute("type") == "color") {
            padding = ".5rem";
            input.style.cursor = "default";
          }
          input.style.padding = padding;
        }
        element.shadowRoot.querySelector("span.text-field .field").shadowRoot.querySelector("div.field").style["user-select"] = "none";
      });
    }
    // ダイアログの機能改善（ダイアログが開かれたときの一瞬だけスクロールバーが出るやつを消す）
    {
      const elements = document.querySelectorAll("md-dialog");
      Array.from(elements).forEach(element => {
        element.shadowRoot.querySelector("dialog div.container div.scroller").style.overflow = "hidden";
      });
    }
    // メニューの機能改善（md-menuのhas-overflowが有効な場合に、アニメーション時にアイテムが選択できないのを選択できるように）
    {
      const elements = document.querySelectorAll("md-menu[has-overflow]");
      Array.from(elements).forEach(element => {
        element.shadowRoot.querySelector("div.menu.has-overflow")?.classList?.remove("has-overflow");
      });
    }
  }
}

// ロード完了まで待機
document.addEventListener("readystatechange", () => {
  if (document.readyState === "complete") {

    new MutationObserver((mutationsList, observer) => {
      mutationsList.forEach(mutation => {
        MaterialDesign3Fix.refreshComponents();
      });
    }).observe(document.body, { childList: true, subtree: true });

    // 機能改善のメソッドを呼び出す
    MaterialDesign3Fix.refreshComponents();

    // ロード完了時にbodyを表示する
    document.body.style.display = "block";
  }
});
// End ===== Material Design 3 =====