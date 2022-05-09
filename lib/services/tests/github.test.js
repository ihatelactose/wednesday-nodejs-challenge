describe('fetchReposFromGithub', () => {
    it('should call the github api', async () => {
        const repo = 'repo';
        const { fetchReposFromGithub } = require('../github');
        const res = { data: { items: [] } };
        const axiosSpy = jest
            .spyOn(require('axios'), 'get')
            .mockImplementation(() => res);
        const data = await fetchReposFromGithub(repo);
        expect(data).toBe(res);
        expect(axiosSpy).toBeCalled();
        expect(axiosSpy).toBeCalledWith(
            `https://api.github.com/search/repositories?q=${repo}&per_page=2`
        );
    });
});
