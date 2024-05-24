function getCurrentDateTime() {
    const now = new Date();
    return now.toISOString().replace(/[^0-9]/g, '');
}

const USER_DATA = {
    login: 'user_' + getCurrentDateTime(),
    password: 'test1234',
    name: 'TestName',
    email: 'test_' + getCurrentDateTime() + '@example.com',
    address: 'Yoshkar-Ola',
    note: 'Note',
};

module.exports = { USER_DATA };
