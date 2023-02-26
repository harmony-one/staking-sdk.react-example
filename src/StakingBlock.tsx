import React, { useState, useEffect } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import Web3 from "web3";
import { StakingContract } from "harmony-staking-sdk";

const StakingBlock = ({ validatorAddress }: { validatorAddress: string }) => {
    const [web3, setWeb3] = useState<Web3 | null>(null);
    const [account, setAccount] = useState<string | null>(null);
    const [stakingContract, setStakingContract] = useState<StakingContract | null>(null);
    const [delegationAmount, setDelegationAmount] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    useEffect(() => {
        const initializeWeb3 = async () => {
            //@ts-ignore
            if (window.ethereum) {
                //@ts-ignore
                const web3 = new Web3(window.ethereum);
                try {
                    //@ts-ignore
                    await window.ethereum.enable();
                    setWeb3(web3);
                } catch (error) {
                    console.error(error);
                }
                //@ts-ignore
            } else if (window.web3) {
                //@ts-ignore
                setWeb3(new Web3(window.web3.currentProvider));
            } else {
                console.error("No Web3 provider detected");
            }
        };
        initializeWeb3();
    }, []);

    useEffect(() => {
        if (web3) {
            const initializeStakingContract = async () => {
                const stakingContract = new StakingContract({
                    provider: web3.currentProvider as any,
                });
                setStakingContract(stakingContract);
            };
            initializeStakingContract();
        }
    }, [web3]);

    useEffect(() => {
        if (web3) {
            const getAccount = async () => {
                const [account] = await web3.eth.getAccounts();
                setAccount(account);
            };
            getAccount();
        }
    }, [web3]);

    const handleDelegate = async () => {
        if(!web3) {
            setError('Web3 not initilized');
            return;
        }

        if (!stakingContract) {
            setError("Staking contract not initialized");
            return;
        }
        if (!account) {
            setError("No account detected");
            return;
        }
        try {
            setLoading(true);
            const tx = await stakingContract.delegate(
                validatorAddress,
                web3.utils.toWei(delegationAmount.toString(), 'ether'),
                (txHash) => {
                    setSuccess(`Delegate transaction sent: ${txHash}`);
                    setLoading(false);
                }
            );
            console.log("Delegate transaction confirmed:", tx);
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleUndelegate = async () => {
        if(!web3) {
            setError('Web3 not initilized');
            return;
        }

        if (!stakingContract) {
            setError("Staking contract not initialized");
            return;
        }
        if (!account) {
            setError("No account detected");
            return;
        }
        try {
            setLoading(true);
            const tx = await stakingContract.unDelegate(
                validatorAddress,
                web3.utils.toWei(delegationAmount.toString()),
                (txHash) => {
                    setSuccess(`Undelegate transaction sent: ${txHash}`);
                    setLoading(false);
                }
            );
            console.log("Undelegate transaction confirmed:", tx);
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleClaimRewards = async () => {
        if(!web3) {
            setError('Web3 not initilized');
            return;
        }

        if (!stakingContract) {
            setError("Staking contract not initialized");
            return;
        }
        if (!account) {
            setError("No account detected");
            return;
        }
        try {
            setLoading(true);
            const tx = await stakingContract.collectRewards((txHash) => {
                setSuccess(`Claim rewards transaction sent: ${ txHash }`);
                setLoading(false);
            });
            console.log("Claim rewards transaction confirmed:", tx);
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h2>Harmony Staking</h2>
                    <Form>
                        <Form.Group controlId="formDelegationAmount">
                            <Form.Label>Delegation amount (ONE)</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter amount"
                                value={delegationAmount}
                                onChange={(e) => setDelegationAmount(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                    <Button className="mr-3" onClick={handleDelegate}>
                        Delegate
                    </Button>
                    <Button className="mr-3" onClick={handleUndelegate}>
                        UnDelegate
                    </Button>
                    <Button className="mr-3" onClick={handleClaimRewards}>
                        Claim Rewards
                    </Button>
                    {loading && (
                        <div className="my-3">
                            <Alert variant="primary">Loading...</Alert>
                        </div>
                    )}
                    {error && (
                        <div className="my-3">
                            <Alert variant="danger">{error}</Alert>
                        </div>
                    )}
                    {success && (
                        <div className="my-3">
                            <Alert variant="success">{success}</Alert>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StakingBlock;