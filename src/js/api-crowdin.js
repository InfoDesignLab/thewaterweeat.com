const apiToken = '5f778960d5b772dc1ba6dd9dbd1e21fde6e05f36b3cd957bd3ce41481833863fe1c43774eecd83ee';
const projectId = '475235';
const url = `https://api.crowdin.com/api/v2/`;

const headers = new Headers();
headers.append('Authorization', `Bearer ${apiToken}`);

export async function getCrowdinLanguages() {
  const response = await fetch(`${url}projects/${projectId}`, {
    headers,
  });
  const { data } = await response.json();
  return data.targetLanguages;
}
