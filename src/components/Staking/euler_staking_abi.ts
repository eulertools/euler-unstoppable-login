export const eulerStakingABI = Object.freeze({
  abi: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'Claim',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'Deposit',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'previousOwner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'OwnershipTransferred',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newEulerPerBlock',
          type: 'uint256',
        },
      ],
      name: 'SetEulerPerBlock',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'token',
          type: 'address',
        },
      ],
      name: 'SetEulerToken',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newEulerTxFee',
          type: 'uint256',
        },
      ],
      name: 'SetEulerTxFee',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newLockupDuration',
          type: 'uint256',
        },
      ],
      name: 'SetLockupDuration',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newMaxDepositAmount',
          type: 'uint256',
        },
      ],
      name: 'SetMaxDepositAmount',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newMinDepositAmount',
          type: 'uint256',
        },
      ],
      name: 'SetMinDepositAmount',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'startBlock',
          type: 'uint256',
        },
      ],
      name: 'StartStaking',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'Withdraw',
      type: 'event',
    },
    {
      inputs: [],
      name: 'claim',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
      name: 'deposit',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'euler',
      outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'eulerPerBlock',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'eulerTxFee',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getTotalUsers',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: '_user', type: 'address' }],
      name: 'getUserInfo',
      outputs: [
        {
          components: [
            { internalType: 'uint256', name: 'amount', type: 'uint256' },
            {
              internalType: 'uint256',
              name: 'pendingRewards',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'withdrawAvaliable',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'eulerPerBlock',
              type: 'uint256',
            },
            { internalType: 'uint256', name: 'tvl', type: 'uint256' },
          ],
          internalType: 'struct EulerStaking.GetUserInfo',
          name: '',
          type: 'tuple',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: 'position', type: 'uint256' }],
      name: 'getUserInfoByPosition',
      outputs: [
        {
          components: [
            { internalType: 'uint256', name: 'amount', type: 'uint256' },
            {
              internalType: 'uint256',
              name: 'pendingRewards',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'withdrawAvaliable',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'eulerPerBlock',
              type: 'uint256',
            },
            { internalType: 'uint256', name: 'tvl', type: 'uint256' },
          ],
          internalType: 'struct EulerStaking.GetUserInfo',
          name: '',
          type: 'tuple',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'initialLockupDuration',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'maxDepositAmount',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'maxFee',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'minDepositAmount',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'poolInfo',
      outputs: [
        {
          internalType: 'uint256',
          name: 'lastRewardBlock',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'accEulerPerShare',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'depositedAmount',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'rewardsAmount',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'lockupDuration',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'renounceOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_eulerPerBlock',
          type: 'uint256',
        },
      ],
      name: 'setEulerPerBlock',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'contract IERC20',
          name: '_euler',
          type: 'address',
        },
      ],
      name: 'setEulerToken',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: '_fee', type: 'uint256' }],
      name: 'setEulerTxFee',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_lockupDuration',
          type: 'uint256',
        },
      ],
      name: 'setLockupDuration',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }],
      name: 'setMaxDepositAmount',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }],
      name: 'setMinDepositAmount',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: 'startBlock', type: 'uint256' }],
      name: 'startStaking',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
      name: 'transferOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'userInfo',
      outputs: [
        { internalType: 'uint256', name: 'amount', type: 'uint256' },
        { internalType: 'uint256', name: 'rewardDebt', type: 'uint256' },
        {
          internalType: 'uint256',
          name: 'pendingRewards',
          type: 'uint256',
        },
        { internalType: 'uint256', name: 'lastClaim', type: 'uint256' },
        { internalType: 'bool', name: 'exists', type: 'bool' },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
      name: 'withdraw',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'withdrawAll',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
});
