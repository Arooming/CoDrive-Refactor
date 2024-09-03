import { useState } from 'react';
import styled from 'styled-components';
import {
  IcArrowBottomGray,
  IcArrowTopGray,
  IcGroupFilter,
} from '../../../assets';
import CommonHashTag from '../../../common/CommonHashTag';
import { LanguageSelectBoxProps } from '../../../types/GroupAll/GroupAllType';
import RangeSliderFilter from './RangeSlidrFilter';

const ALL_TAG = 'ALL';
const firstRowTags = ['Python', 'Java', 'JavaScript', 'C++', 'C', 'C#'];
const secondRowTags = ['Kotlin', 'Swift', 'Ruby', 'Scala', 'Go'];

const LanguageSelectBox = ({
  selectedTags,
  setSelectedTags,
  setSliderValues,
}: LanguageSelectBoxProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [tempValue, setTempValue] = useState({
    min: 0,
    max: 50,
  });
  const [isSliderValueVisible, setIsSliderValueVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
    if (!isSliderValueVisible) {
      setIsSliderValueVisible(true);
    }
  };

  const addTag = (tag: string) => {
    if (selectedTags.length >= 3 && tag !== ALL_TAG) {
      return;
    }

    if (tag === ALL_TAG) {
      setSelectedTags([ALL_TAG]); // ALL_TAG만 selectedTags에 추가
    } else {
      if (!selectedTags.includes(tag)) {
        const newTags = selectedTags.includes(ALL_TAG)
          ? [tag] // ALL_TAG가 이미 선택되어 있으면 새로운 태그로 대체
          : [...selectedTags, tag];

        setSelectedTags(newTags);
      }
    }
  };

  const removeTag = (tag: string) => {
    if (tag === ALL_TAG) {
      setSelectedTags([]);
    } else {
      const newTags = selectedTags.filter((t) => t !== tag);
      setSelectedTags(newTags);
    }
  };

  const onChangeTempValue = (value: number, isMinValue: boolean) => {
    const updatedTempValue = {
      ...tempValue,
      [isMinValue ? 'min' : 'max']: value,
    };

    // tempValue 상태 업데이트
    setTempValue(updatedTempValue);

    // GroupItem의 슬라이드 상태 업데이트
    setSliderValues(updatedTempValue);
  };

  return (
    <Section>
      <DropdownContainer onClick={toggleDropdown}>
        <SelectContainer>
          <FilterIconContainer>
            <IcGroupFilter />
          </FilterIconContainer>
          <SelectedTagsContainer>
            {selectedTags.length === 1 && selectedTags[0] === ALL_TAG ? (
              <SelectedTagContainer key={ALL_TAG}>
                <CommonHashTag
                  selectedTag={ALL_TAG}
                  removeTag={() => removeTag(ALL_TAG)}
                />
              </SelectedTagContainer>
            ) : selectedTags.length === 0 ? (
              <DropdownText>그룹 필터</DropdownText>
            ) : (
              selectedTags.map((tag, index) => (
                <SelectedTagContainer key={index}>
                  <CommonHashTag
                    selectedTag={tag}
                    removeTag={(e) => {
                      if (e) e.stopPropagation();
                      removeTag(tag);
                    }}
                  />
                </SelectedTagContainer>
              ))
            )}
          </SelectedTagsContainer>
          {(selectedTags.length > 0 || isSliderValueVisible) && <Border />}

          {isSliderValueVisible && (
            <RangeValue>
              {tempValue.min}명 - {tempValue.max}명
            </RangeValue>
          )}
        </SelectContainer>
        <IconContainer>
          {isDropdownOpen ? <IcArrowTopGray /> : <IcArrowBottomGray />}
        </IconContainer>
      </DropdownContainer>
      {isDropdownOpen && (
        <DropdownItemContainer>
          <DropdownTitle>
            <Title>사용언어</Title>
            <Info>최대 3개까지 선택 가능합니다</Info>
          </DropdownTitle>
          <TagContainer>
            <LanguageItemsContainer>
              <DropdownItems>
                {firstRowTags.map((tag) => (
                  <PickTagContainer key={tag}>
                    <DropdownItem
                      $isSelected={selectedTags.includes(tag)}
                      onClick={() => addTag(tag)}
                    >
                      {tag}
                    </DropdownItem>
                  </PickTagContainer>
                ))}
              </DropdownItems>
              <DropdownItems>
                {secondRowTags.map((tag) => (
                  <PickTagContainer key={tag}>
                    <DropdownItem
                      $isSelected={selectedTags.includes(tag)}
                      onClick={() => addTag(tag)}
                    >
                      {tag}
                    </DropdownItem>
                  </PickTagContainer>
                ))}
              </DropdownItems>
            </LanguageItemsContainer>
            <Borderline />
            <AllTagContainer>
              <DropdownItem
                $isSelected={selectedTags.includes(ALL_TAG)}
                onClick={() => addTag(ALL_TAG)}
              >
                {ALL_TAG}
              </DropdownItem>
            </AllTagContainer>
          </TagContainer>
          <RangeSliderContainer>
            <RangeTitle>수용인원</RangeTitle>
            <RangeSliderFilter
              min={0}
              max={50}
              step={5}
              rangeMin={5}
              minValue={tempValue.min}
              maxValue={tempValue.max}
              onChangeMin={(value) => onChangeTempValue(value, true)}
              onChangeMax={(value) => onChangeTempValue(value, false)}
            />
          </RangeSliderContainer>
        </DropdownItemContainer>
      )}
    </Section>
  );
};

export default LanguageSelectBox;

const Section = styled.section`
  position: relative;
`;

const DropdownContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 61.1rem;
  height: 4.8rem;
  padding: 1.5rem 2rem 1.4rem;
  margin-bottom: 0.6rem;

  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.colors.gray700};
  cursor: pointer;
`;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
`;

const FilterIconContainer = styled.p`
  display: flex;
  justify-content: center;

  margin-right: 1.2rem;
`;

const SelectedTagsContainer = styled.div`
  width: 29.6rem;
`;

const SelectedTagContainer = styled.div`
  display: inline-flex;
`;

const Border = styled.div`
  width: 0.1rem;
  height: 2.2rem;
  margin-right: 1.4rem;

  border-right: 0.1rem solid ${({ theme }) => theme.colors.gray400};
`;

const RangeValue = styled.p`
  ${({ theme }) => theme.fonts.body_medium_16};
  color: ${({ theme }) => theme.colors.white};
`;

const DropdownText = styled.p`
  ${({ theme }) => theme.fonts.body_ligth_16};
  color: ${({ theme }) => theme.colors.gray300};
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DropdownItemContainer = styled.div`
  position: absolute;

  width: 100%;
  height: 27.6rem;
  padding: 1.6rem;

  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.colors.gray700};
  cursor: pointer;
`;

const DropdownTitle = styled.div`
  margin-bottom: 1.8rem;
`;

const Title = styled.p`
  margin-bottom: 0.4rem;

  ${({ theme }) => theme.fonts.body_medium_16};
  color: ${({ theme }) => theme.colors.white};
`;

const Info = styled.p`
  ${({ theme }) => theme.fonts.detail_regular_12};
  color: ${({ theme }) => theme.colors.gray200};
`;

const TagContainer = styled.div`
  display: flex;
`;

const RangeSliderContainer = styled.div`
  margin-top: 3.4rem;
`;

const RangeTitle = styled.p`
  margin-bottom: 1.5rem;

  ${({ theme }) => theme.fonts.body_medium_16};
  color: ${({ theme }) => theme.colors.white};
`;

const LanguageItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DropdownItems = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const PickTagContainer = styled.div`
  margin-bottom: 0.8rem;
`;

const DropdownItem = styled.div<{ $isSelected: boolean }>`
  display: inline-flex;
  align-items: center;

  padding: 0.6rem 1rem;

  border-radius: 0.4rem;
  ${({ theme }) => theme.fonts.body_eng_medium_12};
  background-color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.codrive_green : theme.colors.gray500};
  color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.bg : theme.colors.gray200};
`;

const Borderline = styled.div`
  margin-left: 1.8rem;

  border-right: 0.1rem solid ${({ theme }) => theme.colors.gray400};
`;

const AllTagContainer = styled.div`
  margin-left: 1.8rem;
`;
