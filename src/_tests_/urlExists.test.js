import urlExists from '../urlExists';

test('test when the url is valid', () => {
  expect(urlExists('https://holiday-homes-project.s3.eu-north-1.amazonaws.com/home_image.png')).toBe(true);
});

test('test when the url is invalid', () => {
  expect(urlExists('invalid url')).toBe(false);
});
