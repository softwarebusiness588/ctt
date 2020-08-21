const WITHSTANDING_WITHOUT_NEEDS = 'WITHSTANDING_WITHOUT_NEEDS';
const WITHSTANDING_WITH_NEEDS = 'WITHSTANDING_WITH_NEEDS';
const NOT_WITHSTANDING_WITHOUT_NEEDS = 'NOT_WITHSTANDING_WITHOUT_NEEDS';
const NOT_WITHSTANDING_WITH_NEEDS = 'NOT_WITHSTANDING_WITH_NEEDS';

const options = {
  voices: [
    'Joanna',
    'Kendra',
    'Kimberly',
    'Salli',
    'Joey',
    'Matthew',
    'Geraint',
    'Russell',
    'Brian',
  ],
  dispatchCenterVoice: 'Joanna',
  incomingCommandOfficerVoice: 'Brian',
  maxAdditionalAlarmSeconds: 100,
  maxUnitArrivalSeconds: 60,
  maxIncomingOfficerArrivalSeconds: 60,
  educationVoice: 'Matthew',
  dispatchCallOptions: [
    'Dispatch has received one call.',
    'Dispatch has received multiple calls.',
    'Caller states smoke in the building.',
    'Caller reports smoke in the area.',
    'Caller reports everyone is out of the structure.',
  ],
  initialReportTerms: [
    'feet',
    'story',
    'rise',
    'residential',
    'commercial',
    'industrial',
    'yard',
    'family',
    'dwelling',
    'apartment',
    'office',
    'house',
    'warehouse',
    'tiltup',
    'retail',
    'small',
    'medium',
    'large',
  ],
  threeSixtyAssessmentTerms: [
    'room',
    'content',
    'attic',
    'basement',
    'structure',
    'fire',
    'bidirectional',
    'bi-directional',
    'unidirectional',
    'uni-directional',
    'survivability',
    'profile',
    'exhaust',
    'intake',
    'positive',
    'marginal',
    'negative',
    'entry',
    'egress',
  ],
  icsNimsGroups: [
    {
      name: 'Water',
      terms: ['supply', 'line', 'hydrant', 'water']
    },
    {
      name: 'Fire Attack',
      terms: ['attack', 'attach', 'rescue', 'interior'],
      canReports: [
        {
          type: WITHSTANDING_WITHOUT_NEEDS,
          response:
            'The building is withstanding the insult, we are advancing and we do not need any additional resources at this time.',
        },
        {
          type: WITHSTANDING_WITH_NEEDS,
          response:
            'The building is withstanding the insult, we are advancing and we could use additional resources.',
        },
        {
          type: NOT_WITHSTANDING_WITHOUT_NEEDS,
          response:
            'The building is NOT withstanding the insult, we are evacuating the building and we do not need additional resources.',
        },
        {
          type: NOT_WITHSTANDING_WITH_NEEDS,
          response:
            'The building is NOT withstanding the insult, we are stalemated and we could use additional resources.',
        },
      ],
    },
    {
      name: 'Ventilation',
      terms: ['ventilation'],
      canReports: [
        {
          type: WITHSTANDING_WITHOUT_NEEDS,
          response:
            'The building is withstanding the insult, we are ventilating and we do not need any additional resources at this time.',
        },
        {
          type: WITHSTANDING_WITH_NEEDS,
          response:
            'The building is withstanding the insult, we are ventilating and we could use additional resources.',
        },
        {
          type: NOT_WITHSTANDING_WITHOUT_NEEDS,
          response:
            'The building is NOT withstanding the insult, we are evacuating the building and we do not need additional resources.',
        },
        {
          type: NOT_WITHSTANDING_WITH_NEEDS,
          response:
            'The building is NOT withstanding the insult, we are unable to ventilate, moving to a safer location and we could use additional resources.',
        },
      ],
    },
    {
      name: 'Exposure',
      terms: ['exposure'],
      canReports: [
        {
          type: WITHSTANDING_WITHOUT_NEEDS,
          response:
            'The exposure is withstanding the insult, we are protecting the exposures and we do not need any additional resources at this time.',
        },
        {
          type: WITHSTANDING_WITH_NEEDS,
          response:
            'The exposure is withstanding the insult, we are protecting the exposures and could use additional resources.',
        },
        {
          type: NOT_WITHSTANDING_WITHOUT_NEEDS,
          response:
            'The building is NOT withstanding the insult, we are retreating to a safer location and we do not need additional resources.',
        },
        {
          type: NOT_WITHSTANDING_WITH_NEEDS,
          response:
            'The building is NOT withstanding the insult, we are unable to protect the exposures, we are retreating to a safer location and we could use additional resources.',
        },
      ],
    },
    {
      name: 'RIC',
      terms: ['ric', 'rick', 'on deck', 'deck'],
      canReports: [
        {
          type: WITHSTANDING_WITHOUT_NEEDS,
          response:
            'We are in position and are softening the building. All IDLH resources are located, we do not need any additional resources.',
        },
        {
          type: WITHSTANDING_WITH_NEEDS,
          response:
            'We are in position and are softening the building. All IDLH resources are located, we could use additional resources.',
        },
        {
          type: NOT_WITHSTANDING_WITHOUT_NEEDS,
          response: 'RIC CAN REPORT NOT WITHSTANDING WITHOUT NEEDS',
        },
        {
          type: NOT_WITHSTANDING_WITH_NEEDS,
          response:
            'We are in position and having difficulty softening the building.  Not all IDLH resources are located, we could use additional resources.',
        },
      ],
    },
    {
      name: 'Medical',
      terms: ['med', 'medical'],
      canReports: [
        {
          type: WITHSTANDING_WITHOUT_NEEDS,
          response:
            'We are currently triaging and treating all patients. We do not need any additional resources.',
        },
        {
          type: WITHSTANDING_WITH_NEEDS,
          response:
            'We are currently triaging and treating all patients. We need additional resources.',
        },
        {
          type: NOT_WITHSTANDING_WITHOUT_NEEDS,
          response:
            'We are evacuating patients. We do not need any additional resources.',
        },
        {
          type: NOT_WITHSTANDING_WITH_NEEDS,
          response: 'We are evacuating patients. We need additional resources.',
        },
      ],
    },
  ],
  parReport: 'All present and accounted for.',
};

const shuffleArray = arr => {
  let newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

const anyTermsMatchString = (str, terms) => {
  if (typeof str !== 'string') {
    return false;
  }
  if (typeof terms === 'string') {
    return str.toLowerCase().includes(terms.toLowerCase());
  } else {
    for (let i = 0; i < terms.length; i++) {
      if (typeof terms[i] === 'string') {
        if (str.toLowerCase().includes(terms[i].toLowerCase())) {
          return true;
        }
      }
    }
    return false;
  }
};

const strReplace = (s, f, r) => {
  return s.replace(
    new RegExp(
      '(' +
        (typeof f === 'string'
          ? f.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&')
          : f
              .map(i => {
                return i.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&');
              })
              .join('|')) +
        ')',
      'g'
    ),
    typeof r === 'string'
      ? r
      : typeof f === 'string'
      ? r[0]
      : i => {
          return r[f.indexOf(i)];
        }
  );
};

const randomSelection = items => {
  const rand = Math.floor(Math.random() * items.length);
  return items[rand];
};

export { options, shuffleArray, anyTermsMatchString, strReplace, randomSelection };
