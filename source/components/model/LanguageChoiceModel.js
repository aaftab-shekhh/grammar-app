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
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../../constants/colors';
import {update_user} from '../../redux/store';
import {get_data, get_token} from '../../utils/api';
import Font400 from '../font/Font400';
import Font700 from '../font/Font700';
import {error} from '../../tost/error';

const LanguageChoiceModel = forwardRef((_, ref) => {
  const user = useSelector(state => state?.auth);

  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loader, setLoader] = useState(true);
  const [selectLanguage, setSelectedLanguage] = useState({
    language: user?.user?.language,
  });

  const dispatch = useDispatch();

  const close = useCallback(() => {
    if (!user?.user?.language) return;
    setVisible(false);
  }, [user?.user?.language]);

  useImperativeHandle(
    ref,
    () => {
      return {
        open: () => setVisible(true),
        close: close,
      };
    },
    [],
  );

  const getData = useCallback(async () => {
    const data = {
      access_key: 6808,
      get_languages: 1,
    };
    try {
      const response = await get_data(data);
      setData(response?.data);
    } catch (err) {
      error(err);
      console.log('err', err);
    } finally {
      setLoader(false);
    }
  }, [user?.user?.access_token]);

  const getToken = useCallback(async () => {
    if (user?.user?.access_token && user?.user?.access_token?.length !== 0)
      return;

    try {
      setLoader(true);
      const response = await get_token();
      dispatch(update_user({access_token: response}));
      await getData();
    } catch (e) {
      error(e);
    } finally {
      setLoader(false);
    }
  }, [user?.user?.access_token]);

  useEffect(() => {
    getToken();
    getData();
  }, []);

  const onSelectHandler = useCallback(value => {
    dispatch(update_user({language: value?.id}));
    setSelectedLanguage({language: value?.id});
    dispatch(update_user());
    setTimeout(() => {
      setVisible(false);
    }, 100);
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
          {loader || data?.length === 0 ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size={'large'} color={colors.color113251} />
            </View>
          ) : (
            <View style={styles.languageChoiceContainer}>
              {data?.map((ele, index) => {
                return (
                  <Pressable
                    key={index?.toString()}
                    onPress={() => {
                      onSelectHandler(ele);
                    }}
                    style={styles.languageChoice}>
                    <Font400 style={styles.text}>{ele?.language}</Font400>
                    <View style={styles.radioButton}>
                      {selectLanguage?.language === ele?.id ? (
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
