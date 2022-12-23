import Menu from './Menu';
import {
  AccountContainer,
  ContentsBox,
  Title,
  MainContainer,
  DeactivateBox,
  InfoItem,
  Label,
  Input,
  FixedValue,
  Button,
} from './account-style';

const Deactivate = () => {
  return (
    <AccountContainer>
      <Title>My Account</Title>
      <ContentsBox>
        <Menu />
        <MainContainer>
          <DeactivateBox>
            <InfoItem>
              <Label htmlFor="nickname">
                <p>Email</p>
                <FixedValue>kailey224@gmail.com</FixedValue>
              </Label>
            </InfoItem>
            <InfoItem>
              <Label htmlFor="password">
                <p>Password</p>
                <Input type="password" />
              </Label>
            </InfoItem>
          </DeactivateBox>
          <Button>Delete my account</Button>
        </MainContainer>
      </ContentsBox>
    </AccountContainer>
  );
};

export default Deactivate;
