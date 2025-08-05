document.getElementById('post1').addEventListener('click', () => postId(1));
document.getElementById('post2').addEventListener('click', () => postId(2));
document.getElementById('post3').addEventListener('click', () => postId(3));
document.getElementById('post4').addEventListener('click', () => postId(4));
document.getElementById('post5').addEventListener('click', () => postId(5));

document.getElementById('get1').addEventListener('click', () => getId(1));
document.getElementById('get2').addEventListener('click', () => getId(2));
document.getElementById('get3').addEventListener('click', () => getId(3));
document.getElementById('get4').addEventListener('click', () => getId(4));
document.getElementById('get5').addEventListener('click', () => getId(5));

async function postId(id) {
    const res = await fetch(`/api/${id}`, { method: 'POST' });
    const data = await res.json();
    document.getElementById('output').textContent = JSON.stringify(data, null, 2);
}

async function getId(id) {
    const res = await fetch(`/api/${id}`);
    const data = await res.json();
    document.getElementById('output').textContent = JSON.stringify(data, null, 2);
}