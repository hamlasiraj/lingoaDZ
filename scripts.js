

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[ًٌٍَُِّْ]/g, '')
    .replace(/[^\u0621-\u064A\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

async function analyzeLinguistic() {
  const input = normalize(document.getElementById("textInput").value);
  const resultBox = document.getElementById("analysisResult");

  if (!input) {
    resultBox.innerHTML = "<p style='color:red;'>⚠️ من فضلك أدخل كلمة للتحليل.</p>";
    return;
  }

  resultBox.innerHTML = "⏳ جاري التحليل...";

  try {
    const response = await fetch("http://localhost:5000/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ word: input })  // ✅ send the word
    });

    const data = await response.json();

    if (data && data.expression) {
      resultBox.innerHTML = `
        <h3>🧠 التحليل اللساني:</h3>
        <div>
          <strong>📌 التعبير:</strong> ${data.expression}<br>
          🔊 <b>صوتي:</b> ${data.phonetic}<br>
          🧬 <b>صرفي:</b> ${data.morpho}<br>
          🧩 <b>نحوي:</b> ${data.syntax}<br>
          🧠 <b>دلالي:</b> ${data.semantic}<br>
          💬 <b>تداولي:</b> ${data.pragmatic}
        </div>`;
    } else {
      resultBox.innerHTML = "<p style='color:red;'>⚠️ لم يتم العثور على نتيجة.</p>";
    }

  } catch (error) {
    console.error(error);
    resultBox.innerHTML = "<p style='color:red;'>❌ خطأ في الاتصال بالخادم.</p>";
  }
}



async function analyzeForensic() {
  const input = normalize(document.getElementById("textInput").value);
  const resultBox = document.getElementById("analysisResult");

  if (!input) {
    resultBox.innerHTML = "<p style='color:red;'>⚠️ من فضلك أدخل كلمة للتحليل.</p>";
    return;
  }

  resultBox.innerHTML = "⏳ جاري التحليل...";

  try {
    const response = await fetch("http://localhost:5000/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ word: input })  // ✅ send the word
    });

    const data = await response.json();

    if (data && data.expression) {
      resultBox.innerHTML = `
        <h3>⚖️ التحليل الجنائي:</h3>
        <div>
          <strong>📌 التعبير:</strong> ${data.expression}<br>
          📍 <b>المنطقة:</b> ${data.region}<br>
          ⚖️ <b>الوصف الجنائي:</b> ${data.forensic}
        </div>`;
    } else {
      resultBox.innerHTML = "<p style='color:red;'>⚠️ لا يوجد وصف جنائي.</p>";
    }

  } catch (error) {
    console.error(error);
    resultBox.innerHTML = "<p style='color:red;'>❌ خطأ في الاتصال بالخادم.</p>";
  }
}
