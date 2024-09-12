export function saveJSONToFile(jsonObject, filename) {
    // Convert JSON object to a string
    const jsonString = JSON.stringify(jsonObject, null, 2);

    // Create a Blob object with the JSON string
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Create a link element
    const link = document.createElement('a');

    // Set the link's href attribute to a URL representing the Blob object
    link.href = URL.createObjectURL(blob);

    // Set the download attribute with the provided filename
    link.download = filename;

    // Append the link to the document body (required for Firefox)
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Clean up by revoking the Blob URL and removing the link
    URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
}