'use client';
//todo 처음으로 고른 암장 다음 기록에서 안바뀌게 고정
import {
  Autocomplete,
  AutocompleteItem,
  Input,
  Button,
  Spinner,
  Popover,
  PopoverTrigger,
  PopoverContent,
  DatePicker,
} from '@nextui-org/react';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { PostInputDataType } from '@/app/types/post-input-data-type';
import { Key } from '@react-types/shared';
import usePlaceList from '@/app/hooks/use-place-list';
import useLeadGradeList from '@/app/hooks/use-lead-grade-list';
import useBoulderGradeList from '@/app/hooks/use-boulder-grade-list';
import useBoardGradeList from '@/app/hooks/use-board-grade-list';
import HeartSvg from '@/app/components/heart-svg';
import palette from '@/app/utils/palette';
import { toast } from 'sonner';
import fetcher from '@/app/utils/fetcher';
import MethodType from '@/app/types/method-type';
import { UserType } from '@/app/types/user-type';
import { DateValue, getLocalTimeZone, now } from '@internationalized/date';
import { I18nProvider } from '@react-aria/i18n';

interface BaseGradeType {
  id: number;
  colorGrade?: string;
  vGrade?: string | string[];
  yosemiteGrade?: string;
}

const climbTypes = [
  { id: 0, name: '볼더링' },
  { id: 1, name: '리드' },
  { id: 2, name: '문보드' },
  { id: 3, name: '킬터보드' },
];

const completeTypes = [
  { id: 0, name: '😭 완등하지 못했어요..' },
  { id: 1, name: '😍 완등했어요!' },
];

export default function Post() {
  const [user, setUser] = useState<UserType | null>(null);
  const { placeList } = usePlaceList();
  const { boulderGradeList, fetchBoulderGradeList } = useBoulderGradeList();
  const { leadGradeList } = useLeadGradeList();
  const { boardGradeList } = useBoardGradeList();
  const [placeKey, setPlaceKey] = useState<Key>('');
  const [climbTypeKey, setClimbTypeKey] = useState<Key>('');
  const [gradeKey, setGradeKey] = useState<Key>('');
  const [isCompleteKey, setIsCompleteKey] = useState<Key>('');
  const [attemptKey, setAttemptKey] = useState('');
  const [isNext, setIsNext] = useState(false);
  const [postInputData, setPostInputData] = useState<PostInputDataType>({
    placeId: -1,
    climbType: 'none',
    boulderGradeId: -1,
    leadGradeId: -1,
    boardGradeId: -1,
    isCompleted: -1,
    attempt: -1,
    date: now(getLocalTimeZone()),
  });
  const [selectFile, setSelectFile] = useState<File | null>(null);
  const [date, setDate] = useState<DateValue>(now(getLocalTimeZone()));
  const [postInputDataList, setPostInputDataList] = useState<
    {
      placeId: number;
      climbType: string;
      boulderGradeId: number;
      leadGradeId: number;
      boardGradeId: number;
      isCompleted: number;
      attempt: number;
      date: DateValue;
      file: File;
    }[]
  >([]);
  const [isSubmitDoneLoading, setIsSubmitDoneLoading] = useState(false);

  const handlePlaceSelectionChange = (placeKey: Key | null) => {
    const resetCascadeField = () => {
      setClimbTypeKey('');
      setGradeKey('');
      setIsCompleteKey('');
      setAttemptKey('');
      setPostInputData((prevData) => ({
        ...prevData,
        climbType: 'none',
        boulderGradeId: -1,
        leadGradeId: -1,
        boardGradeId: -1,
        isCompleted: -1,
        attempt: -1,
        date: now(getLocalTimeZone()),
      }));
    };

    if (placeKey) {
      resetCascadeField();
      setPlaceKey(placeKey);
      setPostInputData((prevData) => ({
        ...prevData,
        placeId: Number(placeKey),
      }));
      fetchBoulderGradeList(Number(placeKey));
    }
  };

  const handleClimbTypeSelectionChange = (climbTypeKey: Key | null) => {
    const resetCascadeField = () => {
      setGradeKey('');
      setIsCompleteKey('');
      setAttemptKey('');
      setPostInputData((prevData) => ({
        ...prevData,
        boulderGradeId: -1,
        leadGradeId: -1,
        boardGradeId: -1,
        isCompleted: -1,
        attempt: -1,
      }));
    };

    if (climbTypeKey) {
      const findClimbType = climbTypes.find(
        (type) => type.id === Number(climbTypeKey),
      );
      setClimbTypeKey(climbTypeKey);
      setPostInputData((prevData) => ({
        ...prevData,
        climbType: findClimbType?.name || 'none',
      }));
      resetCascadeField();
    }
  };

  const handleGradeSelectionChange = (gradeKey: Key | null) => {
    const resetCascadeField = () => {
      setIsCompleteKey('');
      setAttemptKey('');
      setPostInputData((prevData) => ({
        ...prevData,
        isCompleted: -1,
        attempt: -1,
      }));
    };

    if (gradeKey) {
      setGradeKey(gradeKey);
      setPostInputData((prevData) => {
        switch (prevData.climbType) {
          case '볼더링':
            return { ...prevData, boulderGradeId: Number(gradeKey) };
          case '리드':
            return { ...prevData, leadGradeId: Number(gradeKey) };
          default:
            return { ...prevData, boardGradeId: Number(gradeKey) };
        }
      });
      resetCascadeField();
    }
  };

  const handleIsCompleteSelectionChange = (isCompleteKey: Key | null) => {
    const resetCascadeField = () => {
      setAttemptKey('');
      setPostInputData((prevData) => ({
        ...prevData,
        attempt: -1,
      }));
    };

    if (isCompleteKey) {
      setIsCompleteKey(isCompleteKey);
      setPostInputData((prevData) => ({
        ...prevData,
        isCompleted: Number(isCompleteKey),
      }));
      resetCascadeField();
    }
  };

  const handleAttemptChange = (attemptKey: string) => {
    if (Number(attemptKey) < 1 || Number(attemptKey) > 50) return;
    setAttemptKey(attemptKey);
    setPostInputData((prevData) => ({
      ...prevData,
      attempt: Number(attemptKey),
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
    if (file && file.type.includes('video')) {
      const fileUrl = URL.createObjectURL(file);
      const video = document.createElement('video');

      video.src = fileUrl;
      video.addEventListener('loadedmetadata', () => {
        if (video.duration > 600) {
          toast.error('영상 길이가 10분을 초과합니다.');
        } else {
          setSelectFile(file);
        }
        URL.revokeObjectURL(fileUrl);
      });
    }
    e.target.value = '';
  };

  const validateInputData = () => {
    if (
      postInputData.placeId === -1 ||
      postInputData.climbType === 'none' ||
      (postInputData.boulderGradeId === -1 &&
        postInputData.leadGradeId === -1 &&
        postInputData.boardGradeId === -1) ||
      postInputData.isCompleted === -1 ||
      postInputData.attempt === -1
    ) {
      toast.error('값을 모두 입력해주세요');
      return false;
    } else if (postInputData.date > now(getLocalTimeZone())) {
      toast.error('미래의 기록은 할 수 없어요');
      return false;
    }
    return true;
  };

  const handleSubmitNext = () => {
    if (!selectFile) {
      toast.error('영상을 선택하지 않았어요');
      return;
    } else {
      if (!validateInputData()) return;
    }

    setPostInputDataList((prevList) => [
      ...prevList,
      {
        placeId: postInputData.placeId,
        climbType: postInputData.climbType,
        boulderGradeId: postInputData.boulderGradeId,
        leadGradeId: postInputData.leadGradeId,
        boardGradeId: postInputData.boardGradeId,
        isCompleted: postInputData.isCompleted,
        attempt: postInputData.attempt,
        date: now(getLocalTimeZone()),
        file: selectFile,
      },
    ]);

    setPostInputData({
      placeId: postInputData.placeId,
      climbType: 'none',
      boulderGradeId: -1,
      leadGradeId: -1,
      boardGradeId: -1,
      isCompleted: -1,
      attempt: -1,
      date: now(getLocalTimeZone()),
    });

    setSelectFile(null);

    setClimbTypeKey('');
    setGradeKey('');
    setIsCompleteKey('');
    setAttemptKey('');

    setIsNext(true);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetcher('/auth/authenticate', MethodType.GET);
      if (response) {
        const user = await response.json();
        setUser(user);
      }
    };

    fetchUser();
  }, []);

  const handleSubmitDone = async () => {
    if (!selectFile) {
      toast.error('영상을 선택하지 않았어요');
      return;
    } else {
      if (!validateInputData()) return;
    }

    setIsSubmitDoneLoading(true);

    try {
      const newPostInputDataList = [
        ...postInputDataList,
        {
          ...postInputData,
          file: selectFile,
        },
      ];

      setPostInputDataList(newPostInputDataList);

      const formData = new FormData();

      newPostInputDataList.forEach((postInputData, index) => {
        formData.append('file', postInputData.file);
        formData.append(
          `inputData[${index}]`,
          JSON.stringify({
            placeId: postInputData.placeId,
            climbType: postInputData.climbType,
            boulderGradeId: postInputData.boulderGradeId,
            leadGradeId: postInputData.leadGradeId,
            boardGradeId: postInputData.boardGradeId,
            isCompleted: postInputData.isCompleted,
            attempt: postInputData.attempt,
            date: postInputData.date,
          }),
        );
      });

      const fetchPromise = fetcher(
        '/climb/' + user?.id,
        MethodType.POST,
        formData,
      );

      toast.promise(fetchPromise, {
        loading: '기록을 게시하고 있어요. 조금만 기다려주세요.',
        success: '성공!',
        error: '실패',
      });

      await Promise.all([fetchPromise]);
    } catch (error) {
      console.log(error);
    }

    setPostInputDataList([]);

    setPostInputData({
      placeId: -1,
      climbType: 'none',
      boulderGradeId: -1,
      leadGradeId: -1,
      boardGradeId: -1,
      isCompleted: -1,
      attempt: -1,
      date: now(getLocalTimeZone()),
    });
    setSelectFile(null);
    resetAllKeys();
    setIsNext(false);
    setIsSubmitDoneLoading(false);
    setTimeout(() => {
      window.location.href = '/';
    }, 500);
  };

  const resetAllKeys = () => {
    setPlaceKey('');
    setClimbTypeKey('');
    setGradeKey('');
    setIsCompleteKey('');
    setAttemptKey('');
  };

  return (
    <div className='min-h-screen'>
      <div className='mx-auto flex h-screen max-w-4xl items-center justify-center bg-white'>
        <div className='flex gap-10'>
          <div className='flex flex-col gap-10'>
            {/*암벽장 선택*/}
            <div>
              <h2 className='text-lg font-semibold'>장소를 선택해주세요</h2>
              <Autocomplete
                label={'암장을 선택해주세요'}
                variant='underlined'
                className={'max-w-xs'}
                isDisabled={isSubmitDoneLoading || isNext}
                disabledKeys={['loading']}
                defaultItems={placeList}
                selectedKey={placeKey}
                onSelectionChange={handlePlaceSelectionChange}
              >
                {placeList.length === 0 ? (
                  <AutocompleteItem key='loading'>
                    <div className='flex items-center justify-center'>
                      <Spinner size='sm' />
                    </div>
                  </AutocompleteItem>
                ) : (
                  placeList.map((item) => (
                    <AutocompleteItem key={item.id}>
                      {item.name}
                    </AutocompleteItem>
                  ))
                )}
              </Autocomplete>
            </div>
            {/*등반 종류 선택*/}
            <div>
              <h2 className='text-lg font-semibold'>어떤 등반을 하셨나요?</h2>
              <Autocomplete
                label={'등반을 선택해주세요'}
                variant='underlined'
                className={'max-w-xs'}
                isDisabled={!placeKey || isSubmitDoneLoading}
                defaultItems={climbTypes}
                selectedKey={climbTypeKey}
                onSelectionChange={handleClimbTypeSelectionChange}
              >
                {(item) => (
                  <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
                )}
              </Autocomplete>
            </div>
            {/*그레이드 선택*/}
            <div>
              <h2 className='text-lg font-semibold'>난이도를 선택해주세요</h2>
              <Autocomplete
                label={'난이도를 선택해주세요'}
                variant='underlined'
                className={'max-w-xs'}
                isDisabled={!climbTypeKey || isSubmitDoneLoading}
                disabledKeys={['loading']}
                defaultItems={
                  postInputData.climbType === '볼더링'
                    ? (boulderGradeList as BaseGradeType[])
                    : postInputData.climbType === '리드'
                      ? (leadGradeList as BaseGradeType[])
                      : (boardGradeList as BaseGradeType[])
                }
                selectedKey={gradeKey}
                onSelectionChange={handleGradeSelectionChange}
              >
                {boulderGradeList.length === 0 ? (
                  <AutocompleteItem key='loading'>
                    <div className='flex items-center justify-center'>
                      <Spinner size='sm' />
                    </div>
                  </AutocompleteItem>
                ) : (
                  (item) => (
                    <AutocompleteItem
                      key={item.id}
                      startContent={
                        postInputData.climbType === '볼더링' ? (
                          item.colorGrade?.length === 1 ? (
                            <div className='w-[25px] rounded border-2 text-center text-black/50'>
                              {item.colorGrade}
                            </div>
                          ) : (
                            <HeartSvg
                              height={16}
                              hex={
                                palette[
                                  (item.colorGrade as keyof typeof palette) ??
                                    ''
                                ]
                              }
                            />
                          )
                        ) : null
                      }
                    >
                      {postInputData.climbType === '볼더링'
                        ? item.vGrade?.length && item.vGrade.length > 1
                          ? `${item.vGrade[0]}~${item.vGrade[1]}`
                          : item.vGrade?.[0] || ''
                        : postInputData.climbType === '리드'
                          ? item.yosemiteGrade || ''
                          : item.vGrade || ''}
                    </AutocompleteItem>
                  )
                )}
              </Autocomplete>
            </div>
            {/*완등 여부 선택*/}
            <div>
              <h2 className='text-lg font-semibold'>완등 하셨나요?</h2>
              <Autocomplete
                label={'완등 여부를 선택해주세요'}
                variant='underlined'
                className={'max-w-xs'}
                isDisabled={!gradeKey || isSubmitDoneLoading}
                defaultItems={completeTypes}
                selectedKey={isCompleteKey}
                onSelectionChange={handleIsCompleteSelectionChange}
              >
                {(item) => (
                  <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
                )}
              </Autocomplete>
            </div>
            {/*시도 횟수 선택*/}
            <div>
              <h2 className='text-lg font-semibold'>몇 번 시도 하셨나요?</h2>
              <Input
                label={'시도 횟수를 입력해주세요'}
                variant='underlined'
                type='number'
                min={1}
                max={50}
                className={'max-w-xs'}
                isDisabled={!isCompleteKey || isSubmitDoneLoading}
                value={!isCompleteKey ? '' : attemptKey}
                onChange={(e) => handleAttemptChange(e.target.value)}
              />
            </div>
          </div>
          <div className='bg-black/2 flex h-full flex-col gap-5 rounded-3xl p-10'>
            <div className='h-[350px] w-[350px]'>
              {selectFile ? (
                <video
                  src={URL.createObjectURL(selectFile)}
                  width={350}
                  height={350}
                  controls
                  loop
                  autoPlay
                  className='h-full rounded-3xl shadow-2xl'
                />
              ) : (
                <div className='flex h-full w-full items-center justify-center rounded-3xl bg-gray-100 shadow-2xl'>
                  영상 넣어!
                </div>
              )}
            </div>
            <div>
              <h2 className='text-lg font-semibold'>
                🎥 등반 영상을 올려주세요!
              </h2>
            </div>
            <div className='flex flex-col gap-10'>
              <div className='flex items-end justify-between'>
                <label
                  htmlFor='file-upload-button'
                  className='rounded-xl border-2 px-5 py-2 hover:bg-black/10'
                >
                  파일 선택
                </label>
                <Popover placement='top' showArrow>
                  <PopoverTrigger>
                    <p className='flex h-8 min-w-16 items-center gap-2 px-3 text-tiny underline'>
                      이전 날짜를 기록하시나요?
                    </p>
                  </PopoverTrigger>
                  <PopoverContent className='p-4'>
                    <I18nProvider locale='ko-KR'>
                      <DatePicker
                        label='날짜를 선택해주세요'
                        variant='underlined'
                        labelPlacement='inside'
                        showMonthAndYearPickers
                        hideTimeZone
                        isDisabled={isSubmitDoneLoading}
                        value={date}
                        onChange={(e) => {
                          setDate(e);
                          setPostInputData((prevData) => ({
                            ...prevData,
                            date: e,
                          }));
                        }}
                      />
                    </I18nProvider>
                  </PopoverContent>
                </Popover>
              </div>
              <div className='flex w-full gap-2'>
                <Button
                  isDisabled={isSubmitDoneLoading || isSubmitDoneLoading}
                  onClick={() => {
                    handleSubmitDone();
                  }}
                  className='w-[40%] border-2 border-black/10 bg-yellow-200 text-black'
                >
                  {isSubmitDoneLoading ? (
                    <Spinner size='sm' color='default' />
                  ) : (
                    '완료'
                  )}
                </Button>
                <Button
                  isDisabled={isSubmitDoneLoading}
                  onClick={() => {
                    handleSubmitNext();
                  }}
                  className='w-[60%] border-2 border-black/10 bg-green-300 text-black'
                >
                  다음으로
                </Button>
              </div>
              <input
                type='file'
                accept='video/*'
                id='file-upload-button'
                onChange={handleFileChange}
                className='hidden'
                disabled={isSubmitDoneLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
