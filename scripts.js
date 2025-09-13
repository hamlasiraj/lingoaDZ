function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[ًٌٍَُِّْ]/g, '')
    .replace(/[^\u0621-\u064A\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Show/hide spinner
function setLoading(on) {
  document.getElementById("loading").style.display = on ? "flex" : "none";
}

// Render collapsible sections
function renderSections(resultBox, sections) {
  resultBox.innerHTML = "";

  sections.forEach(({ key, label, value }) => {
    if (value && value.trim() !== "") {
      const section = document.createElement("div");
      section.className = "section";
      section.innerHTML = `
        <div class="coll" data-key="${key}">
          <div style="display:flex;gap:10px;align-items:center">
            <strong>${label}</strong> <span class="badge">عرض التفاصيل</span>
          </div>
          <div style="font-size:13px;color:var(--muted)">انقر للعرض</div>
        </div>
        <div class="coll-content"><div style="padding-top:6px">${value}</div></div>
      `;
      resultBox.appendChild(section);

      const coll = section.querySelector(".coll");
      coll.addEventListener("click", () => {
        coll.classList.toggle("open");
        const content = coll.nextElementSibling;
        content.style.maxHeight = coll.classList.contains("open") ? content.scrollHeight + "px" : 0;
      });
    }
  });
}

async function analyzeLinguistic() {
  const input = normalize(document.getElementById("textInput").value);
  const resultBox = document.getElementById("analysisResult");

  if (!input) {
    resultBox.innerHTML = "<p style='color:red;'>⚠️ من فضلك أدخل كلمة للتحليل.</p>";
    return;
  }

  setLoading(true);
  resultBox.innerHTML = "⏳ جاري التحليل...";

  try {
    const response = await fetch("https://lingoadz-backend.onrender.com/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ word: input })
    });

    const data = await response.json();

    if (data && data.expression) {
      const sections = [
        { key: "expression", label: "📌 التعبير", value: data.expression },
        { key: "phonetic", label: "🔊 صوتي", value: data.phonetic },
        { key: "morpho", label: "🧬 صرفي", value: data.morpho },
        { key: "syntax", label: "🧩 نحوي", value: data.syntax },
        { key: "semantic", label: "🧠 دلالي", value: data.semantic },
        { key: "pragmatic", label: "💬 تداولي", value: data.pragmatic },
      ];
      renderSections(resultBox, sections);
    } else {
      resultBox.innerHTML = "<p style='color:red;'>⚠️ لم يتم العثور على نتيجة.</p>";
    }

  } catch (error) {
    console.error(error);
    resultBox.innerHTML = "<p style='color:red;'>❌ خطأ في الاتصال بالخادم.</p>";
  } finally {
    setLoading(false);
  }
}

async function analyzeForensic() {
  const input = normalize(document.getElementById("textInput").value);
  const resultBox = document.getElementById("analysisResult");

  if (!input) {
    resultBox.innerHTML = "<p style='color:red;'>⚠️ من فضلك أدخل كلمة للتحليل.</p>";
    return;
  }

  setLoading(true);
  resultBox.innerHTML = "⏳ جاري التحليل...";

  try {
    const response = await fetch("https://lingoadz-backend.onrender.com/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ word: input })
    });

    const data = await response.json();

    if (data && data.expression) {
      const sections = [
        { key: "expression", label: "📌 التعبير", value: data.expression },
        { key: "region", label: "📍 المنطقة", value: data.region },
        { key: "forensic", label: "⚖️ الوصف الجنائي", value: data.forensic },
      ];
      renderSections(resultBox, sections);
    } else {
      resultBox.innerHTML = "<p style='color:red;'>⚠️ لا يوجد وصف جنائي.</p>";
    }

  } catch (error) {
    console.error(error);
    resultBox.innerHTML = "<p style='color:red;'>❌ خطأ في الاتصال بالخادم.</p>";
  } finally {
    setLoading(false);
  }
}

// Clear button handler
document.getElementById("clearBtn").addEventListener("click", () => {
  document.getElementById("textInput").value = "";
  document.getElementById("analysisResult").innerHTML =
    "<span class='muted'>لم يتم تنفيذ أي تحليل بعد.</span>";
});
