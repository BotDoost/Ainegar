async function generateArticle() {
       const topic = document.getElementById("topic").value;
       const resultDiv = document.getElementById("result");
       
       try {
         resultDiv.innerHTML = "🔮 در حال تولید مقاله...";
         
         const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
             "Authorization": "Bearer کلید-API-شما"
           },
           body: JSON.stringify({
             model: "deepseek-chat",
             messages: [{
               role: "user",
               content: `مقاله‌ای 200 کلمه‌ای به فارسی درباره ${topic} بنویس`
             }]
           })
         });

         if (!response.ok) throw new Error("خطای سرور");
         const data = await response.json();
         resultDiv.innerHTML = data.choices[0].message.content;
         
       } catch (error) {
         resultDiv.innerHTML = `❌ خطا: ${error.message}`;
         console.error("جزئیات خطا:", error);
       }
     }
