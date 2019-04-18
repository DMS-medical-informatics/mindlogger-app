import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';
import {
  Container,
  Button,
  View,
  Header,
  Left,
  Right,
  Icon,
  Title,
  Body,
  Text,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import { showToast, setApiHost } from '../../state/app/app.actions';
import { apiHostSelector } from '../../state/app/app.selectors';
import QRCodeScanner from 'react-native-qrcode-scanner';

class ScanQr extends Component {
  onScan = (body) => {
    const { showToast, setApiHost } = this.props;
    Actions.replace('login');
    setApiHost(body.data);
    showToast({
      text: 'Study has been set by QR.',
      position: 'top',
      type: 'success',
      duration: 4000,
    });
  }

  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <Header>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name="close" />
            </Button>
          </Left>
          <Body>
            <Title>Scan QR</Title>
          </Body>
          <Right />
        </Header>
        <View style = {styles.container}>
          <QRCodeScanner
            onRead={this.onScan}
            showMarker={true}
          />
        </View>
      </Container>
    );
  }
}

ScanQr.propTypes = {
  showToast: PropTypes.func.isRequired,
  setApiHost: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  apiHost: apiHostSelector(state),
});

const mapDispatchToProps = {
  showToast,
  setApiHost,
};

export default connect(mapStateToProps, mapDispatchToProps)(ScanQr);
