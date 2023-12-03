async function saveScoreToDB(googleUID, score, userName){
    const data = {
        googleUID : googleUID,
        score : score,
        userName : userName,
        time : new Date().toISOString().split('T')[0]  
    };

    try {
        const response = await fetch('https://wheel-of-fortune-406910.wl.r.appspot.com/saveScore', 
        {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(data),
        });

        if (!response.ok){
            throw new Error('Network response was not ok');
        }

        const jsonResponse = await response.json();
        console.log('Score saved successfully', jsonResponse);
    } catch (error) {
        console.error('Error saving score: ', error);
    }
}

export {saveScoreToDB};