const api = {
    getColleges() {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', '../data/college.json', true);
            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        const data = JSON.parse(xhr.responseText);
                        resolve(data);
                    } catch (error) {
                        console.error('Error parsing college data:', error);
                        resolve([]);
                    }
                } else {
                    console.error('Failed to load colleges');
                    resolve([]);
                }
            };
            xhr.onerror = function() {
                console.error('Error loading colleges');
                resolve([]);
            };
            xhr.send();
        });
    },

    getUsers() {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', '../data/user.json', true);
            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        const data = JSON.parse(xhr.responseText);
                        resolve(data);
                    } catch (error) {
                        console.error('Error parsing user data:', error);
                        resolve([]);
                    }
                } else {
                    console.error('Failed to load users');
                    resolve([]);
                }
            };
            xhr.onerror = function() {
                console.error('Error loading users');
                resolve([]);
            };
            xhr.send();
        });
    },

    checkUsername(username) {
        return new Promise((resolve, reject) => {
            this.getUsers().then(users => {
                const available = !users.some(user => user.username === username);
                resolve(available);
            });
        });
    },

    registerUser(userData) {
        return new Promise(resolve => {
            // Simulate server request with timeout
            console.log('Registering user:', userData);
            setTimeout(() => {
                resolve({ success: true });
            }, 1000);
        });
    }
};