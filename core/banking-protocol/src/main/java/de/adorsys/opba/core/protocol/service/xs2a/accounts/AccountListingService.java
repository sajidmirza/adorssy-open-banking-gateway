package de.adorsys.opba.core.protocol.service.xs2a.accounts;

import com.google.common.collect.ImmutableMap;
import de.adorsys.opba.core.protocol.service.xs2a.context.Xs2aContext;
import de.adorsys.xs2a.adapter.service.AccountInformationService;
import de.adorsys.xs2a.adapter.service.RequestParams;
import de.adorsys.xs2a.adapter.service.Response;
import de.adorsys.xs2a.adapter.service.model.AccountListHolder;
import lombok.RequiredArgsConstructor;
import org.flowable.engine.delegate.DelegateExecution;
import org.flowable.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static de.adorsys.opba.core.protocol.constant.GlobalConst.CONTEXT;

@Service("accountListing")
@RequiredArgsConstructor
public class AccountListingService implements JavaDelegate {

    private final AccountInformationService ais;

    @Override
    @Transactional
    public void execute(DelegateExecution delegateExecution) {
        Xs2aContext context = delegateExecution.getVariable(CONTEXT, Xs2aContext.class);

        Response<AccountListHolder> accounts = ais.getAccountList(
                context.toHeaders(),
                RequestParams.fromMap(ImmutableMap.of("withBalance", "false"))
        );

        context.setResult(accounts.getBody());
        delegateExecution.setVariable(CONTEXT, context);
    }
}
