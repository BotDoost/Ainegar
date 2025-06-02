async function generateArticle() {
  const topic = document.getElementById("topic").value.trim();
  const resultDiv = document.getElementById("result");

  // 1. بررسی ورودی کاربر
  if (!topic) {
    resultDiv.innerHTML = "⚠️ لطفاً موضوع مقاله را وارد کنید";
    return;
  }

  // 2. نمایش وضعیت در حال پردازش
  resultDiv.innerHTML = "🔮 در حال تولید مقاله...";
  
  try {
    // 3. درخواست مستقیم به API
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer fac4cf69016d4b99a52f5ad6b107a6ca" // 
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{
          role: "user",
          content: `مقاله‌ای 200 کلمه‌ای به فارسی درباره ${topic} بنویس`
        }]
      })
    });

    // 4. بررسی پاسخ سرور
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "خطا در سرور");
    }

    // 5. نمایش نتیجه
    const data = await response.json();
    resultDiv.innerHTML = data.choices[0].message.content;

  } catch (error) {
    // 6. مدیریت خطاها
    console.error("خطای کامل:", error);
    
    let userMessage = "خطا در تولید مقاله";
    if (error.message.includes("Failed to fetch")) {
      userMessage = "اتصال به اینترنت را بررسی کنید";
    } else if (error.message.includes("401")) {
      userMessage = "کلید API نامعتبر است";
    }
    
    resultDiv.innerHTML = `❌ ${userMessage}`;
  }
}
