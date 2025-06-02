async function generateArticle() {
    const topic = document.getElementById("topic").value;
    const resultDiv = document.getElementById("result");
    
    resultDiv.innerHTML = "در حال تولید مقاله...";
    
    try {
        // استفاده از API Proxy برای حل مشکل CORS
        const proxyUrl = "https://cors-anywhere.herokuapp.com/";
        const apiUrl = "https://api.openai-proxy.com/v1/chat/completions";
        
        const response = await fetch(proxyUrl + apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer sk-test-xxxxxxxx" // این را تغییر دهید
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{
                    role: "user",
                    content: `مقاله‌ای 100 کلمه‌ای به فارسی درباره ${topic} بنویس`
                }]
            })
        });
        
        const data = await response.json();
        resultDiv.innerHTML = data.choices[0].message.content;
        
    } catch (error) {
        resultDiv.innerHTML = "خطا: " + error.message;
        console.error("Error details:", error);
    }
}
