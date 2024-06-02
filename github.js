class Github {
  constructor() {
    this.client_id = 'Ov23libZxzHsI5KFj4oa';
    this.client_secret = '2b282226224cd1af93a2cf213b37ebb48b29177d';
    this.repos_count = 5;
    this.repos_sort = 'created: asc';
  }

  async getUser(user) {
    const profileResponse = await fetch(
      `https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`
    );

    console.log(profileResponse);

    const repoResponse = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`
    );

    const profile = await profileResponse.json();
    const repos = await repoResponse.json();

    return {
      profile,
      repos,
    };
  }

  async getContributions(user) {
    const contributionsResponse = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${user}`
    );
    const contributions = await contributionsResponse.json();
    console.log(contributions);
    return contributions;
  }
}
