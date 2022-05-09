import CircuitBreaker from 'opossum';
import { logger } from 'utils';

const options = {
    timeout: 3000,
    errorThresholdPercentage: 50,
    resetTimeout: 30000
};

export const newCircuitBreaker = (func, fallbackMsg) => {
    const breaker = new CircuitBreaker(func, options);
    breaker.fallback((params, err) => {
        logger().error('inside circuitbreaker fallback', err);
        // add slack alerts
        logger().error(
            'fallbackMsg: ',
            fallbackMsg,
            'params: ',
            params,
            'error:',
            err.message
        );
        // eslint-disable-next-line
    return `${fallbackMsg}. ${err.message || err}`;
    });
    return breaker;
};
