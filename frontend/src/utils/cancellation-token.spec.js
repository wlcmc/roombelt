import cancellationToken from "./cancellation-token";

it("by default shows that token has not been cancelled", () => {
  const token = cancellationToken();
  expect(token.isCancelled()).toBeFalsy();
});

it("correctly shows that token has been cancelled", () => {
  const token = cancellationToken();
  token.cancel();
  expect(token.isCancelled()).toBeTruthy();
});

it("cancelOthers cancels other tokens in the same group but does not cancel current token", () => {
  const token1 = cancellationToken();
  const token2 = cancellationToken();

  token1.cancelOthers();
  expect(token1.isCancelled()).toBeFalsy();
  expect(token2.isCancelled()).toBeTruthy();
});

it("cancelAll cancels all tokens in the same group", () => {
  const token1 = cancellationToken();
  const token2 = cancellationToken();

  token1.cancelAll();
  expect(token1.isCancelled()).toBeTruthy();
  expect(token2.isCancelled()).toBeTruthy();
});


it("cancelAll does not cancel tokens from other group", () => {
  const token1 = cancellationToken("group1");
  const token2 = cancellationToken("group1");
  const token3 = cancellationToken("group2");

  token1.cancelAll();

  expect(token1.isCancelled()).toBeTruthy();
  expect(token2.isCancelled()).toBeTruthy();
  expect(token3.isCancelled()).toBeFalsy();
});