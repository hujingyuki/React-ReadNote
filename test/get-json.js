const getJSON = (url) => {
  return new Promise(resolve => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        resolve(data)
      })
  })
}

export default getJSON
