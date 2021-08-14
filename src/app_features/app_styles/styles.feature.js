import styled from "styled-components/native";
import { Button, TextInput } from "react-native-paper";
import { colors } from "../../app_infrastructure/theme/colors";
import { Text } from "../../app_infrastructure/typography/text.component";

export const AccountCover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
`;
export const AccountContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.4);
  padding: ${(props) => props.theme.space[4]};
  margin-top: ${(props) => props.theme.space[5]};
  border-radius: 4px;
`;

export const AuthButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  padding: ${(props) => props.theme.space[2]};
`;
export const AuthInput = styled(TextInput)`
  width: 250px;
`;
export const Title = styled(Text)`
  font-size: 20px;
  color: red;
  text-align: center;
  padding-top: 15px;
  
`;
export const Subtitle = styled(Text)`
  font-size: 15px;
  color: green;
  text-align: center;
  padding-top: 10px;
  
`;
export const ErrorContainer = styled.View`
  max-width: 250px;
  align-items: center;
  align-self: center;
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
`;
export const AnimationWrapper = styled.View`
  width: 100%;
  height: 40%;
  position: absolute;
  top: 30px;
  padding: ${(props) => props.theme.space[2]};
`;
export const EmailContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.4);
  flex-direction: row;
`;
export const PasswordContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.4);
  flex-direction: row;
`;