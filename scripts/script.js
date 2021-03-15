document.addEventListener('DOMContentLoaded', () => {
	'use strict';


	const usersList = document.querySelector('.list'),
		usersData = JSON.parse(localStorage.getItem('usersInfo')) ? JSON.parse(localStorage.getItem('usersInfo')) : [];


	const register = () => {
		let options = {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
				second: 'numeric'
			},
			now = new Date().toLocaleString('ru', options);

		let userName = prompt('Введите имя и фамилию через пробел');
		if (userName.trim().split(' ').length !== 2) {
			alert('Ошибка, некорректные данные');
			return;
		}

		console.log(userName.split(' ')[0]);

		let userInfo = {
			name: userName.split(' ')[0],
			surName: userName.split(' ')[1],
			login: prompt('Введите логин'),
			password: prompt('Введите пароль'),
			date: now
		};

		usersData.push(userInfo);
		localStorage.setItem('usersInfo', JSON.stringify(usersData));

		return usersData;

	};

	const authorize = () => {
		let userLogin = prompt('Введите логин'),
			userPassword = prompt('Введите пароль');

		let isFound = usersData.some((user, i) => {
			return user.login === userLogin && userPassword === user.password;
		});
		if (!isFound) {
			alert('Не найден пользователь с таким логином');
		} else {
			usersData.forEach(user => {
				if (user.login === userLogin && userPassword === user.password) {
					document.getElementById('name').textContent = user.name;
				}
			});
		}

	};

	const deleteUser = close => {
		let listItems = usersList.querySelectorAll('li');
		listItems.forEach((user, i) => {
			if (user === close) {
				usersData.splice(i, 1);
			}
		});

		localStorage.setItem('usersInfo', JSON.stringify(usersData));
	};


	const showOnPage = () => {
		usersList.textContent = '';
		usersData.forEach((item, i) => {
			const li = document.createElement('li');
			li.innerHTML = `Имя: ${item.name}, фамилия: ${item.surName}, дата регистрации: ${item.date}
			<span class="delete-user-btn">&times;</span>`;
			usersList.append(li);
		});
	};


	document.addEventListener('click', event => {
		let target = event.target;
		let close = target.closest('li');
		if (target.matches('#reg')) {
			register();
			showOnPage();
		}
		if (target.matches('#auth')) {
			authorize();
		}

		if (target.matches('.delete-user-btn')) {
			deleteUser(close);
			showOnPage();
		}

	});

	showOnPage();







});