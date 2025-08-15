const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.content');

tabs.forEach(tab => {
    tab.addEventListener('click', async () => {
        // Remove active classes
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        // Activate clicked tab
        tab.classList.add('active');
        const contentDiv = document.getElementById(tab.dataset.tab);
        contentDiv.classList.add('active');

        const folderName = tab.dataset.tab;
        if(folderName === "About") return; // skip About

        try {
            // Fetch the JSON manifest of files
            const response = await fetch(`/${folderName}/files.json`);
            if(response.ok){
                const files = await response.json();
                let htmlContent = '';
                for(const file of files){
                    const res = await fetch(`/${folderName}/${file}`);
                    if(res.ok){
                        htmlContent += await res.text();
                    }
                }
                contentDiv.innerHTML = htmlContent;
            } else {
                contentDiv.innerHTML = `<p>No files found in /${folderName}/</p>`;
            }
        } catch(err) {
            contentDiv.innerHTML = `<p>Error loading content: ${err}</p>`;
        }
    });
});
