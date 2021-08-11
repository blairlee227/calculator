// 結果
  let total = 0;
  // 當前值
  let currentVal = 0;
  // 計算按鈕點擊次數
  let clickCalcuBtn = 0;
  // 按了什麼按鈕
  let action;

  // initailize
  reset();

  function keyin(val) {
    currentVal = currentVal.toString();
    let decimalIndex = currentVal.indexOf(".");
    if (val === "." && decimalIndex !== -1) {
      return;
    } else {
      // 字串相加放到舊數字
      if (currentVal == 0) {
        currentVal = val;
      } else {
        currentVal = currentVal + val;
      }
    }
    // 顯示在畫面上
    innerVal(currentVal);
  }
  // 除以100
  function percentage() {
    if (total == 0) total = currentVal;
    if (typeof total !== "number") total = parseFloat(total);
    total = total / 100;
    innerVal(total);
    action = "";
  }
  // 切換正負號
  function invert() {
    if (total == 0) total = currentVal;
    if (typeof total !== "number") total = parseFloat(total);
    total = -total;
    innerVal(total);
    action = "";
  }
  // 點擊計算功能按鈕
  function calculation(type) {
    action = type;
    clickCalcuBtn++;
    if (clickCalcuBtn > 1) showResult();
    if (total == 0) total = currentVal;
    // 清空舊數字
    currentVal = 0;
  }
  // 執行計算
  function showResult() {
    if (typeof total !== "number") total = parseFloat(total);
    if (typeof currentVal !== "number") currentVal = parseFloat(currentVal);
    switch (action) {
      case "add":
        total += currentVal;
        break;
      case "subtract":
        total -= currentVal;
        break;
      case "multiply":
        total *= currentVal;
        break;
      case "divide":
        total /= currentVal;
        break;
      default:
        if (total == 0 && total !== currentVal) total = currentVal;
    }
    innerVal(total);
    // 清空計數器
    clickCalcuBtn = 0;
  }
  // reset
  function reset() {
    total = 0;
    currentVal = 0;
    clickCalcuBtn = 0;
    innerVal(0);
  }
  // format larger numbers
  function formatVal(val) {
    // 轉成 string
    let formatVal = val.toString();
    let result = "";
    while (formatVal.length > 0) {
      if (formatVal.length < 3) {
        // 字數 < 3 就直接放在前面
        result = formatVal + " " + result;
        break;
      } else {
        // result = 後 3 個字 + 空白 + result
        result = formatVal.substring(formatVal.length - 3) + " " + result;
        // 移除後 3 個字
        formatVal = formatVal.slice(0, formatVal.length - 3);
      }
    }
    // 最後一個字是空白就移除空白
    if (result.charAt(result.length - 1) === " ") result = result.slice(0, -1);
    return result;
  }
  // show result
  function innerVal(val) {
    // 轉成字串
    val = val.toString();
    // 最多 12 位數
    if (val.length > 12) val = val.slice(0, 12);
    // 判斷有沒有小數
    let decimal = "";
    let decimalIndex = val.indexOf(".");
    if (decimalIndex !== -1) {
      // 把小數紀錄起來
      decimal = val.substring(decimalIndex);
      // 要format的值去除小數
      val = val.slice(0, decimalIndex);
    }
    // 4位數以上才需要 format
    if (val.length > 3) val = formatVal(val);
    // 如果有小數要把小數加回來
    if (decimal.length > 0) {
      val += decimal;
    }
    if (val != val) val = "Not a Number!";
    // innerHTML
    document.getElementById("value").innerHTML = val;
    scaleFontSize(val);
  }
  // 根據字串長度變換字體大小
  function scaleFontSize(val) {
    let string = val.toString();
    if (string.length > 12) {
      fontSize("40px");
    } else if (string.length > 9) {
      fontSize("50px");
    } else {
      fontSize("60px");
    }
    function fontSize(size) {
      document.getElementById("value").style.fontSize = size;
    }
  }