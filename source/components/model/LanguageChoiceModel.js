import {useFocusEffect} from '@react-navigation/native';
import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {colors} from '../../constants/colors';
import {get_data} from '../../utils/api';
import Font400 from '../font/Font400';
import Font700 from '../font/Font700';
import {useDispatch, useSelector} from 'react-redux';
import {update_user} from '../../redux/store';

const LanguageChoiceModel = forwardRef((_, ref) => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loader, setLoader] = useState(true);

  const user = useSelector(state => state?.auth);

  useEffect(() => {
    if (!user?.user?.language) setVisible(true);
  }, [user]);

  const dispatch = useDispatch();

  const close = useCallback(() => setVisible(false), []);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (isOpen) {
          setIsOpen(false);
          close();
          setIsOpen(false);
          return true;
        } else {
          return true;
        }
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [isOpen]),
  );

  useImperativeHandle(
    ref,
    () => {
      return {
        open: () => setVisible(true),
        close: close,
      };
    },
    [close],
  );

  const getData = useCallback(async () => {
    const data = {
      access_key: 6808,
      get_languages: 1,
    };
    try {
      const response = await get_data(data);
      setData(response?.data);
    } catch (error) {
    } finally {
      setLoader(false);
    }
  }, [user]);

  useEffect(() => {
    getData();
  }, []);

  const onSelectHandler = useCallback(value => {
    dispatch(update_user({language: value?.id}));
    close();
  }, []);

  return (
    <Modal
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
      animationType="fade">
      <Pressable onPress={close} style={styles.model}>
        <Pressable onPress={() => {}} style={styles.container}>
          <View style={styles.heading}>
            <Font700 style={styles.title}>
              {'Select Your Mode Of Study'}
            </Font700>
          </View>
          {loader ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size={'large'} color={colors.color113251} />
            </View>
          ) : (
            <View style={styles.languageChoiceContainer}>
              {data?.map((ele, index) => {
                return (
                  <Pressable
                    key={index?.toString()}
                    onPress={onSelectHandler?.bind(null, ele)}
                    style={styles.languageChoice}>
                    <Font400 style={styles.text}>{ele?.language}</Font400>
                    <View style={styles.radioButton}>
                      {user?.user?.language === ele?.id ? (
                        <View style={styles.selector} />
                      ) : null}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
});

export default memo(LanguageChoiceModel);

const styles = StyleSheet.create({
  model: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.transparent_black_40,
  },
  container: {
    borderRadius: 8,
    marginHorizontal: 9,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: colors.white,
  },
  heading: {
    height: 39,
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: colors.color125A92,
  },
  title: {
    fontSize: 18,
    color: colors.white,
    textAlign: 'center',
  },
  loaderContainer: {
    marginHorizontal: 28,
    marginBottom: 20,
    height: 100,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  languageChoiceContainer: {
    marginHorizontal: 28,
    marginBottom: 20,
  },
  languageChoice: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginTop: 12,
    paddingBottom: 6,
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.black,
  },
  selector: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: colors.black,
  },
});
