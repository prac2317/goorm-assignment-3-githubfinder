class UI {
  constructor() {
    this.profile = document.getElementById('profile');
  }

  showProfile(user) {
    this.profile.innerHTML = `
      <div class="card card-body mb-3">
        <div class="row">
          <div class="col-md-3">
            <img class="img-fluid mb-2" src="${user.avatar_url}">
            <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
          </div>
          <div class="col-md-9">
            <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
            <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
            <span class="badge badge-success">Followers: ${user.followers}</span>
            <span class="badge badge-info">Following: ${user.following}</span>
            <br><br>
            <ul class="list-group">
              <li class="list-group-item">Company: ${user.company}</li>
              <li class="list-group-item">Website/Blog: ${user.blog}</li>
              <li class="list-group-item">Location: ${user.location}</li>
              <li class="list-group-item">Member Since: ${user.created_at}</li>
            </ul>
          </div>
        </div>
      </div>
      <h3 class="page-heading mb-3">Contributions</h3>
      <div id="contributions"></div>
      <h3 class="page-heading mb-3">Latest Repos</h3>
      <div id="repos"></div>
    `;
  }

  showRepos(repos) {
    let output = '';

    repos.forEach(function (repo) {
      output += `
        <div class="card card-body mb-2">
          <div class="row">
            <div class="col-md-6">
              <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </div>
            <div class="col-md-6">
            <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
            <span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span>
            <span class="badge badge-success">Forks: ${repo.forms_count}</span>
            </div>
          </div>
        </div>
      `;
    });

    document.getElementById('repos').innerHTML = output;
  }

  showContributions(contributions) {
    // 최근 365일 동안의 데이터만 필터링
    const today = new Date();
    const pastYear = new Date();
    pastYear.setDate(today.getDate() - 364);

    const recentContributions = contributions.contributions.filter((day) => {
      const date = new Date(day.date);
      return date >= pastYear && date <= today;
    });

    recentContributions.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

    // 데이터를 주 단위로 나누기
    let weeks = [];
    let week = [];
    recentContributions.forEach((day) => {
      week.push(day);

      // 토요일이거나, '오늘'일 경우 weeks 배열에 넣기
      const date = new Date(day.date);
      if (
        date.getDay() === 6 ||
        date.toISOString().split('T')[0] === today.toISOString().split('T')[0]
      ) {
        weeks.push(week);
        week = [];
      }
    });

    // 잔디 데이터를 가로로 나열
    let output = '<div class="calendar">';
    for (let i = 0; i < weeks.length; i++) {
      output += '<div class="week">';
      for (let j = 0; j < 7; j++) {
        if (weeks[i][j]) {
          const day = weeks[i][j];
          output += `
            <div class="day" style="background-color: ${
              day.level === 0
                ? '#ebedf0'
                : day.level === 1
                ? '#c6e48b'
                : day.level === 2
                ? '#7bc96f'
                : day.level === 3
                ? '#239a3b'
                : '#196127'
            }" title="${day.count} contributions on ${day.date}"></div>
          `;
        }
      }
      output += '</div>';
    }
    output += '</div>';

    document.getElementById('contributions').innerHTML = output;
  }

  showAlert(message, className) {
    this.clearAlert();
    const div = document.createElement('div');
    div.className = className;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.searchContainer');
    const search = document.querySelector('.search');
    container.insertBefore(div, search);

    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  clearAlert() {
    const currentAlert = document.querySelector('.alert');

    if (currentAlert) {
      currentAlert.remove();
    }
  }

  clearProfile() {
    this.profile.innerHTML = '';
  }
}
