const api = {
    async getColleges() {
        try {
            const response = await fetch('../data/college.json');
            if (!response.ok) throw new Error('Failed to load colleges');
            return await response.json();
        } catch (error) {
            console.error('Error loading colleges:', error);
            return [];
        }
    },

    async getUsers() {
        try {
            const response = await fetch('../data/user.json');
            if (!response.ok) throw new Error('Failed to load users');
            return await response.json();
        } catch (error) {
            console.error('Error loading users:', error);
            return [];
        }
    },

    async checkUsername(username) {
        const users = await this.getUsers();
        return !users.some(user => user.username === username);
    },

    async registerUser(userData) {
        // In a real app, this would POST to a server
        console.log('Registering user:', userData);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({ success: true });
            }, 1000);
        });
    }
};