import urlExists from '../urlExists';

test('test when the url is valid', () => {
  expect(urlExists('https://projectbucket-223.s3.us-east-2.amazonaws.com/home_image.png')).toBe(true);
});

test('test when the url is invalid', () => {
  expect(urlExists('invalid url')).toBe(false);
});
